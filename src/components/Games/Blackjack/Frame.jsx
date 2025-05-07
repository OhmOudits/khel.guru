import { useEffect, useState } from "react";
import "../../../styles/Frame.css";
import FrameFooter from "../../Frame/FrameFooter";
import SideBar from "./SideBar";
import Game from "./Game";
import { CARD_SUITS, CARD_VALUES, getCardValue } from "./constant";

import { useSelector } from "react-redux";
import {
  disconnectBlackjackSocket,
  getBlackjackSocket,
  initializeBlackjackSocket,
} from "../../../socket/games/blackjack";
import checkLoggedIn from "../../../utils/isloggedIn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Frame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [bet, setBet] = useState("0.000000");
  const [betStarted, setBettingStarted] = useState(false);

  const [isFairness, setIsFairness] = useState(false);
  const [isGameSettings, setIsGamings] = useState(false);
  const [maxBetEnable, setMaxBetEnable] = useState(false);
  const [theatreMode, setTheatreMode] = useState(false);

  const [volume, setVolume] = useState(50);
  const [instantBet, setInstantBet] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [maxBet, setMaxBet] = useState(false);
  const [gameInfo, setGameInfo] = useState(false);
  const [hotkeys, setHotkeys] = useState(false);

  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [userValue, setUserValue] = useState(0);
  const [dealerValue, setDealerValue] = useState(0);
  const [userResult, setUserResult] = useState(null);
  const [dealerResult, setDealerResult] = useState(null);
  const [split, setSplit] = useState(false);
  const [double, setDouble] = useState(false);

  const [cards, setCards] = useState([]);
  const [isSmt, setIsSmt] = useState(true);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  const initSocket = () => {
    const blackjackSocket = getBlackjackSocket();
    if (!blackjackSocket) {
      initializeBlackjackSocket(token);
    }
  };

  useEffect(() => {
    const blackjackSocket = getBlackjackSocket();

    if (blackjackSocket) {
      blackjackSocket.on("error", ({ message }) => {
        console.error("Join game error:", message);
        toast.error(`Error joining game: ${message}`);
      });
    }

    return () => {
      const blackjackSocket = getBlackjackSocket();
      if (blackjackSocket) {
        blackjackSocket.off("error");
      }
      disconnectBlackjackSocket();
    };
  }, []);

  const createDeck = () => {
    let deck = [];

    for (let suit of CARD_SUITS) {
      for (let value of CARD_VALUES) {
        deck.push({
          suit,
          value,
          id: `${suit}-${value}`,
          rand: Math.floor(Math.random() * 20) + 1,
          flipped: true,
        });
      }
    }

    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
  };

  const [deck, setDeck] = useState(createDeck());

  const handleBetStarted = () => {
    if (!checkLoggedIn()) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    initSocket();

    if (!betStarted) {
      const blackjackSocket = getBlackjackSocket();
      if (blackjackSocket) {
        blackjackSocket.emit("add_game", {});
        console.log("Emitted add_game event");
      } else {
        console.error("Blackjack socket not initialized");
        toast.error("Failed to join game: Check Your Internet Connection");
        return;
      }

      setBettingStarted(true);
      const deckCards = createDeck();
      setCards(deckCards);
      setDeck(deckCards);
      setUserCards([]);
      setDealerCards([]);
      setUserValue(0);
      setDealerValue(0);
      setUserResult(null);
      setDealerResult(null);
      setSplit(false);
      setDouble(false);

      const dealSequence = async () => {
        if (deckCards.length < 4) return;

        for (let i = 0; i < 4; i++) {
          await new Promise((resolve) => setTimeout(resolve, 800));

          setDeck((prevDeck) => prevDeck.slice(1));
          const newCard = deckCards[i];
          const worth = getCardValue(newCard.value);

          if (i === 0 || i === 2) {
            setUserCards((prev) => [...prev, newCard]);
            setTimeout(() => {
              setUserValue((p) => p + worth);
            }, 600);
          } else if (i === 1) {
            setDealerCards((prev) => [...prev, newCard]);
            setTimeout(() => {
              setDealerValue((p) => p + worth);
            }, 600);
          } else if (i === 3) {
            setDealerCards((prev) => [...prev, { ...newCard, flipped: false }]);
            setIsSmt(false);
          }
        }
      };

      dealSequence();
    }
  };

  const handleCheckout = () => {
    setBettingStarted(false);
    setIsSmt(false);
  };

  useEffect(() => {
    if (userValue === 21) {
      setUserResult("win");
      handleCheckout();
    }

    if (dealerValue === 21) {
      setDealerResult("win");
      handleCheckout();
    }

    if (userValue > 21) {
      setUserResult("lose");
      handleCheckout();
    }

    if (dealerValue > 21) {
      setDealerResult("lose");
      handleCheckout();
    }
  }, [userValue, dealerValue]);

  const handleHit = () => {
    if (deck.length === 0 || betStarted === false) return;

    const newCard = deck[0];
    const worth = getCardValue(newCard.value);

    setDeck((prevDeck) => prevDeck.slice(1));
    setUserCards((prev) => [...prev, newCard]);
    setTimeout(() => {
      setUserValue((prev) => prev + worth);
    }, 600);
  };

  const handleStand = async () => {
    setIsSmt(false);
    let dealerHand = [...dealerCards];
    let dealerTotal = dealerValue;

    dealerHand[1].flipped = true;
    dealerTotal += getCardValue(dealerHand[1].value);
    setDealerCards([...dealerHand]);
    setDealerValue(dealerTotal);

    while (dealerTotal < 17 && deck.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newCard = deck[0];
      dealerHand.push(newCard);
      dealerTotal += getCardValue(newCard.value);
      setDeck(deck.slice(1));
      setDealerCards([...dealerHand]);
      setDealerValue(dealerTotal);
    }

    setTimeout(() => {
      if (userValue > dealerTotal) {
        if (!userValue > 21) {
          setUserResult("win");
          setDealerResult("lose");
        }

        if (dealerTotal > 21) {
          setDealerResult("lose");
        }
      } else if (userValue < dealerTotal) {
        if (!dealerValue > 21) {
          setUserResult("lose");
          setDealerResult("win");
        }
      } else {
        setUserResult("draw");
        setDealerResult("draw");
      }
      setBettingStarted(false);
      setIsSmt(false);
    }, 1000);
  };

  useEffect(() => {
    console.log(userResult);
  }, []);

  const isGameEnd = () => {
    return (
      userResult ||
      dealerResult ||
      (userValue > 21 && dealerValue <= 21) ||
      (userValue <= 21 && dealerValue > 21)
    );
  };

  const handleDouble = () => {
    if (!betStarted || userCards.length !== 2) return;
    setBet((prevBet) => (parseFloat(prevBet) * 2).toFixed(6));
    handleHit();

    if (isGameEnd) {
      setTimeout(() => handleStand(), 1000);
    }
  };

  const handleSplit = () => {};

  useEffect(() => {
    if (userCards.length !== 2) {
      setDouble(false);
    } else {
      setDouble(true);
    }
  }, [userCards]);

  return (
    <>
      <div
        className="w-full bg-secondry pt-[1px] pb-[12px] max-lg:pb-[36px]"
        style={{
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <div
          className={`my-12 rounded mx-auto bg-primary w-[96%] max-w-[1400px] max-md:max-w-[450px] ${
            theatreMode ? "max-w-[100%] max-h-screen" : "max-lg:max-w-[450px]"
          }`}
        >
          <div className="flex flex-col gap-[0.15rem] relative">
            <div className="grid grid-cols-12 lg:h-[600px]">
              <SideBar
                theatreMode={theatreMode}
                setBetMode={setBetMode}
                betMode={betMode}
                bet={bet}
                setBet={setBet}
                maxBetEnable={maxBetEnable}
                handleMineBet={handleBetStarted}
                bettingStarted={betStarted}
                isSmt={isSmt}
                handleCheckout={handleCheckout}
                split={split}
                double={double}
                handleDouble={handleDouble}
                handleHit={handleHit}
                handleSplit={handleSplit}
                handleStand={handleStand}
              />

              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-gray-900 order-1`}
              >
                <div className="w-full  text-white rounded-tr h-full justify-center text-3xl">
                  <>
                    <Game
                      userCards={userCards}
                      dealerCards={dealerCards}
                      userValue={userValue}
                      dealerValue={dealerValue}
                      userResult={userResult}
                      dealerResult={dealerResult}
                      deck={deck}
                    />
                  </>
                </div>
              </div>
            </div>
            <FrameFooter
              isFav={isFav}
              isGameSettings={isGameSettings}
              setIsFav={setIsFav}
              setIsFairness={setIsFairness}
              setIsGamings={setIsGamings}
              volume={volume}
              setVolume={setVolume}
              instantBet={instantBet}
              setInstantBet={setInstantBet}
              animations={animations}
              setAnimations={setAnimations}
              maxBet={maxBet}
              setMaxBet={setMaxBet}
              gameInfo={gameInfo}
              setGameInfo={setGameInfo}
              hotkeys={hotkeys}
              setHotkeys={setHotkeys}
              maxBetEnable={maxBetEnable}
              setMaxBetEnable={setMaxBetEnable}
              theatreMode={theatreMode}
              setTheatreMode={setTheatreMode}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Frame;
