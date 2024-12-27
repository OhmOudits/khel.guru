import Matter from "matter-js";
// eslint-disable-next-line no-unused-vars
import { v4 as uuidv4 } from "uuid";
import { getRandomBetween } from "../../../utils/plinko";
import { binPayouts } from "./constant";


class PlinkoEngine {
  static WIDTH = 760;
  static HEIGHT = 500;

  static PADDING_X = 52;
  static PADDING_TOP = 40;
  static PADDING_BOTTOM = 28;

  static PIN_CATEGORY = 0x0001;
  static BALL_CATEGORY = 0x0002;

  static ballFrictions = {
    friction: 0.5,
    frictionAirByRowCount: {
      8: 0.0395,
      9: 0.041,
      10: 0.038,
      11: 0.0355,
      12: 0.0414,
      13: 0.0437,
      14: 0.0401,
      15: 0.0418,
      16: 0.0364,
    },
  };

  constructor(canvas, bet, rows, risk, setCurrentBinIndex) {
    this.canvas = canvas;
    this.betAmount = bet;
    this.rowCount = rows;
    this.riskLevel = risk;

    this.updateBinIndex = setCurrentBinIndex;

    this.updateRowCount(rows);

    this.engine = Matter.Engine.create({ timing: { timeScale: 1 } });
    this.render = Matter.Render.create({
      engine: this.engine,
      canvas: this.canvas,
      options: {
        width: PlinkoEngine.WIDTH,
        height: PlinkoEngine.HEIGHT,
        background: "rgb(17 24 39)",
        wireframes: false,
      },
    });
    this.runner = Matter.Runner.create();

    this.pins = [];
    this.walls = [];
    this.balls = []; // Track active balls
    this.sensor = null;
    this.pinsLastRowXCoords = [];
    this.winsIndex = [];

    this.placePinsAndWalls();

    this.sensor = Matter.Bodies.rectangle(
      this.canvas.width / 2,
      this.canvas.height - 5,
      this.canvas.width,
      10,
      { isSensor: true, isStatic: true, render: { visible: false } }
    );

    Matter.Composite.add(this.engine.world, [this.sensor]);
    Matter.Events.on(this.engine, "collisionStart", ({ pairs }) => {
      pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA === this.sensor) this.handleBallEnterBin(bodyB);
        else if (bodyB === this.sensor) this.handleBallEnterBin(bodyA);
      });
    });
  }

  start() {
    Matter.Render.run(this.render);
    Matter.Runner.run(this.runner, this.engine);
  }

  stop() {
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);

    // Cleanup all objects in the engine
    Matter.Composite.clear(this.engine.world);
    this.balls = [];
  }

  dropBall() {
    const ballOffsetRangeX = this.pinDistanceX * 0.8;
    const ballRadius = this.pinRadius * 2 - 1;
    const { friction, frictionAirByRowCount } = PlinkoEngine.ballFrictions;

    const ball = Matter.Bodies.circle(
      getRandomBetween(
        this.canvas.width / 2 - ballOffsetRangeX,
        this.canvas.width / 2 + ballOffsetRangeX
      ),
      0,
      ballRadius,
      {
        restitution: 0.8,
        friction,
        frictionAir: frictionAirByRowCount[this.rowCount],
        collisionFilter: {
          category: PlinkoEngine.BALL_CATEGORY,
          mask: PlinkoEngine.PIN_CATEGORY,
        },
        render: { fillStyle: "#ff0000" },
      }
    );

    this.balls.push(ball);
    Matter.Composite.add(this.engine.world, ball);
  }

  get pinDistanceX() {
    const list = {
      8: 75.31,
      9: 67.62,
      10: 60.00,
      11: 55.46,
      12: 51.08,
      13: 46.85,
      14: 43.77,
      15: 40.85,
      16: 38.08
    };
    return list[this.rowCount];
}

  updateRowCount(rowCount) {
    if (rowCount === this.rowCount) {
      return;
    }

    this.rowCount = rowCount;
    this.placePinsAndWalls();
  }

  get binsWidthPercentage(){
    const lastPinX = this.pinsLastRowXCoords[this.pinsLastRowXCoords.length - 1];
    return (lastPinX - this.pinsLastRowXCoords[0]) / PlinkoEngine.WIDTH;
  }

  get pinRadius() {
    return (24 - this.rowCount) / 2;
  }


  handleBallEnterBin(ball) {
    const binIndex = this.pinsLastRowXCoords.findLastIndex(
      (pinX) => pinX < ball.position.x
    );

    if (binIndex !== -1 && binIndex < this.pinsLastRowXCoords.length - 1) {
      const multiplier = binPayouts[this.rowCount][this.riskLevel][binIndex];
      const payoutValue = this.betAmount * multiplier;

      console.log(`Ball entered bin ${binIndex}, payout: ${payoutValue}`);
      this.updateBinIndex(binIndex);
    }

    // Remove ball from the engine
    Matter.Composite.remove(this.engine.world, ball);
    this.balls = this.balls.filter((b) => b !== ball);
  }

  placePinsAndWalls() {
    const pinRadius = (24 - this.rowCount - 1) / 2;

    // Calculate the vertical spacing between rows based on the available height
    const availableHeight = PlinkoEngine.HEIGHT - PlinkoEngine.PADDING_TOP - PlinkoEngine.PADDING_BOTTOM;
    const verticalSpacing = availableHeight / (this.rowCount - 1);

    if (this.pins.length > 0) {
      Matter.Composite.remove(this.engine.world, this.pins);
      this.pins = [];
    }
    if (this.pinsLastRowXCoords.length > 0) {
      this.pinsLastRowXCoords = [];
    }
    if (this.walls.length > 0) {
      Matter.Composite.remove(this.engine.world, this.walls);
      this.walls = [];
    }


    for (let row = 0; row < this.rowCount; row++) {
      const pinCount = row + 3; // Number of pins in this row
      const rowY = PlinkoEngine.PADDING_TOP + row * verticalSpacing; // Y-coordinate for this row

      // Calculate the total width occupied by the pins in this row
      const rowPaddingX = PlinkoEngine.PADDING_X + ((this.rowCount - 1 - row) * this.pinDistanceX) / 2;
      // Calculate the starting x position to center the row
      for (let col = 0; col < pinCount; col++) {
        const colX = rowPaddingX + ((PlinkoEngine.WIDTH - rowPaddingX * 2) / (3 + row - 1)) * col;

        const pin = Matter.Bodies.circle(colX, rowY, pinRadius, {
          isStatic: true,
          collisionFilter: { category: PlinkoEngine.PIN_CATEGORY,  mask: PlinkoEngine.BALL_CATEGORY },
          render: { fillStyle: "#ffffff" },
        });

        
        this.pins.push(pin);

        if (row === this.rowCount - 1) {
          this.pinsLastRowXCoords.push(colX);
        }
      }
    }
    Matter.Composite.add(this.engine.world, this.pins);

    const firstPinX = this.pins[0].position.x;
    const leftWallAngle = Math.atan2(
      firstPinX - this.pinsLastRowXCoords[0],
      PlinkoEngine.HEIGHT - PlinkoEngine.PADDING_TOP - PlinkoEngine.PADDING_BOTTOM,
    );
    const leftWallX =
      firstPinX - (firstPinX - this.pinsLastRowXCoords[0]) / 2 - this.pinDistanceX * 0.25;

    const leftWall = Matter.Bodies.rectangle(
      leftWallX,
      PlinkoEngine.HEIGHT / 2,
      10,
      PlinkoEngine.HEIGHT,
      {
        isStatic: true,
        angle: leftWallAngle,
        render: { visible: false },
      },
    );
    const rightWall = Matter.Bodies.rectangle(
      PlinkoEngine.WIDTH - leftWallX,
      PlinkoEngine.HEIGHT / 2,
      10,
      PlinkoEngine.HEIGHT,
      {
        isStatic: true,
        angle: -leftWallAngle,
        render: { visible: false },
      },
    );
    this.walls.push(leftWall, rightWall);
    Matter.Composite.add(this.engine.world, this.walls);
  }
}

export default PlinkoEngine;