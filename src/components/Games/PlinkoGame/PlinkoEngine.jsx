import Matter from "matter-js";
import { v4 as uuidv4 } from "uuid";
import { getRandomBetween } from "../../../utils/plinko";
import { binPayouts } from "./constant";

class PlinkoEngine {
  static WIDTH = 760;
  static HEIGHT = 500;

  static PADDING_X = 52;
  static PADDING_TOP = 36;
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

  constructor(canvas, bet, rows, risk) {
    this.canvas = canvas;
    this.betAmount = bet;
    this.rowCount = rows;
    this.riskLevel = risk;

    this.engine = Matter.Engine.create({ timing: { timeScale: 1 } });
    this.render = Matter.Render.create({
      engine: this.engine,
      canvas: this.canvas,
      options: {
        width: PlinkoEngine.WIDTH,
        height: PlinkoEngine.HEIGHT,
        background: "#0f1728",
        wireframes: false,
      },
    });
    this.runner = Matter.Runner.create();

    this.pins = [];
    this.walls = [];
    this.balls = []; // Track active balls
    this.sensor = null;
    this.pinsLastRowXCoords = [];

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
    const ballRadius = this.pinRadius * 2;
    const { friction, frictionAirByRowCount } = PlinkoEngine.ballFrictions;

    const ball = Matter.Bodies.circle(
      getRandomBetween(
        this.canvas.width / 2 - ballOffsetRangeX,
        this.canvas.width / 2 + ballOffsetRangeX
      ),
      PlinkoEngine.PADDING_TOP,
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
    const lastRowPinCount = 3 + this.rowCount - 1;
    return (
      (this.canvas.width - PlinkoEngine.PADDING_X * 2) / (lastRowPinCount - 1)
    );
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
    }

    // Remove ball from the engine
    Matter.Composite.remove(this.engine.world, ball);
    this.balls = this.balls.filter((b) => b !== ball);
  }

  placePinsAndWalls() {
    const pinRadius = this.pinRadius;

    // Calculate the vertical spacing between rows based on the available height
    const availableHeight =
      PlinkoEngine.HEIGHT -
      PlinkoEngine.PADDING_TOP -
      PlinkoEngine.PADDING_BOTTOM;
    const verticalSpacing = availableHeight / (this.rowCount - 1);

    for (let row = 0; row < this.rowCount; row++) {
      const pinCount = row + 3; // Number of pins in this row
      const y = PlinkoEngine.PADDING_TOP + row * verticalSpacing; // Y-coordinate for this row

      // Calculate the total width occupied by the pins in this row
      const rowWidth = (pinCount - 1) * this.pinDistanceX;

      // Calculate the starting x position to center the row
      const startX = (this.canvas.width - rowWidth) / 2;

      const rowXCoords = [];

      for (let col = 0; col < pinCount; col++) {
        const x = startX + col * this.pinDistanceX;

        const pin = Matter.Bodies.circle(x, y, pinRadius, {
          isStatic: true,
          collisionFilter: { category: PlinkoEngine.PIN_CATEGORY },
          render: { fillStyle: "#ffffff" },
        });

        Matter.Composite.add(this.engine.world, pin);
        rowXCoords.push(x);
      }

      if (row === this.rowCount - 1) {
        this.pinsLastRowXCoords = rowXCoords;
      }
    }
  }
}

export default PlinkoEngine;
