import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";

// Lazy load components for better performance
const LandingPage = lazy(() => import("../MainFrame/LandingPage"));
const Frame = lazy(() => import("../Frame/Frame"));

// Sports pages
const Sports = lazy(() => import("../../pages/Sports"));
const SportsCricket = lazy(() => import("../../pages/SportsCricket"));
const SportsFootball = lazy(() => import("../../pages/SportsFootball"));
const SportsTennis = lazy(() => import("../../pages/SportsTennis"));
const SportsBadminton = lazy(() => import("../../pages/SportsBadminton"));
const SportsBet = lazy(() => import("../../pages/SportBet"));
const SportsBetFootball = lazy(() => import("../../pages/SportBetFootball"));
const SportsBetTennis = lazy(() => import("../../pages/SportBetTennis"));
const SportsBetBadminton = lazy(() => import("../../pages/SportBetBadminton"));

// Game pages
const WheelPage = lazy(() => import("../Games/WheelGame/WheelPage"));
const MinesPage = lazy(() => import("../Games/MinesGame/Diamond"));
const BalloonPage = lazy(() => import("../Games/Parachute/Balloon"));
const CrashPage = lazy(() => import("../Games/CrashGame/Crash"));
const PlinkoPage = lazy(() => import("../Games/PlinkoGame/Plinko"));
const LimboPage = lazy(() => import("../Games/LimboGame/Limbo"));
const DicePage = lazy(() => import("../Games/DiceGame/Dice"));
const KenoPage = lazy(() => import("../Games/Keno/Keno"));
const HiloPage = lazy(() => import("../Games/Hilo/Hilo"));
const BaccaratPage = lazy(() => import("../Games/Baccarat/Baccarat"));
const BlackjackGame = lazy(() => import("../Games/Blackjack/Blackjack"));
const ScratchPage = lazy(() => import("../Games/BallonScratch/BallonScratch"));
const TowerPage = lazy(() => import("../Games/tower/tower"));
const TwistPage = lazy(() => import("../Games/twist/Twist"));
const RoulettePage = lazy(() => import("../Games/roulette/roulette"));
const PumpPage = lazy(() => import("../Games/pump/pump"));
const SlidePage = lazy(() => import("../Games/Slide/Slide"));

// Transaction pages
const Deposits = lazy(() => import("../../pages/transactions/Deposits"));
const Withdrawals = lazy(() => import("../../pages/transactions/Withdrawal"));
const BetArchive = lazy(() => import("../../pages/transactions/BetArcheive"));
const Others = lazy(() => import("../../pages/transactions/Others"));

// Other pages
const MyBets = lazy(() => import("../../pages/MyBets"));

// Settings pages
const General = lazy(() => import("../../pages/settings/General"));
const Security = lazy(() => import("../../pages/settings/Security"));
const Preferences = lazy(() => import("../../pages/settings/Prefernces"));
const Api = lazy(() => import("../../pages/settings/Api"));
const Sessions = lazy(() => import("../../pages/settings/Sessions"));
const IgnoredUsers = lazy(() => import("../../pages/settings/IgnoredUsers"));
const OtherSettings = lazy(() => import("../../pages/settings/Others"));
const Verify = lazy(() => import("../../pages/settings/Verify"));

// Loading wrapper component
const LazyWrapper = ({ children }) => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading page..." />
      </div>
    }
  >
    {children}
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route
        path="/"
        element={
          <LazyWrapper>
            <LandingPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game"
        element={
          <LazyWrapper>
            <Frame />
          </LazyWrapper>
        }
      />

      {/* Sports Routes */}
      <Route
        path="/sports"
        element={
          <LazyWrapper>
            <Sports />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/cricket"
        element={
          <LazyWrapper>
            <SportsCricket />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/cricket/bet"
        element={
          <LazyWrapper>
            <SportsBet />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/football"
        element={
          <LazyWrapper>
            <SportsFootball />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/football/bet"
        element={
          <LazyWrapper>
            <SportsBetFootball />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/tennis"
        element={
          <LazyWrapper>
            <SportsTennis />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/tennis/bet"
        element={
          <LazyWrapper>
            <SportsBetTennis />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/badminton"
        element={
          <LazyWrapper>
            <SportsBadminton />
          </LazyWrapper>
        }
      />

      <Route
        path="/sports/badminton/bet"
        element={
          <LazyWrapper>
            <SportsBetBadminton />
          </LazyWrapper>
        }
      />

      {/* Game Routes */}
      <Route
        path="/game/wheel"
        element={
          <LazyWrapper>
            <WheelPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/mines"
        element={
          <LazyWrapper>
            <MinesPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/parachute"
        element={
          <LazyWrapper>
            <BalloonPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/crash"
        element={
          <LazyWrapper>
            <CrashPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/plinko"
        element={
          <LazyWrapper>
            <PlinkoPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/limbo"
        element={
          <LazyWrapper>
            <LimboPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/dice"
        element={
          <LazyWrapper>
            <DicePage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/keno"
        element={
          <LazyWrapper>
            <KenoPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/hilo"
        element={
          <LazyWrapper>
            <HiloPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/baccarat"
        element={
          <LazyWrapper>
            <BaccaratPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/blackjack"
        element={
          <LazyWrapper>
            <BlackjackGame />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/scratch"
        element={
          <LazyWrapper>
            <ScratchPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/tower"
        element={
          <LazyWrapper>
            <TowerPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/twist"
        element={
          <LazyWrapper>
            <TwistPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/roulette"
        element={
          <LazyWrapper>
            <RoulettePage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/pump"
        element={
          <LazyWrapper>
            <PumpPage />
          </LazyWrapper>
        }
      />

      <Route
        path="/game/slide"
        element={
          <LazyWrapper>
            <SlidePage />
          </LazyWrapper>
        }
      />

      {/* Transaction Routes */}
      <Route
        path="/transactions/deposits"
        element={
          <LazyWrapper>
            <Deposits />
          </LazyWrapper>
        }
      />

      <Route
        path="/transactions/withdrawals"
        element={
          <LazyWrapper>
            <Withdrawals />
          </LazyWrapper>
        }
      />

      <Route
        path="/transactions/bet-archive"
        element={
          <LazyWrapper>
            <BetArchive />
          </LazyWrapper>
        }
      />

      <Route
        path="/transactions/other"
        element={
          <LazyWrapper>
            <Others />
          </LazyWrapper>
        }
      />

      {/* Casino Routes */}
      <Route
        path="/casino/my-bets"
        element={
          <LazyWrapper>
            <MyBets />
          </LazyWrapper>
        }
      />

      {/* Settings Routes */}
      <Route
        path="/settings/general"
        element={
          <LazyWrapper>
            <General />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/security"
        element={
          <LazyWrapper>
            <Security />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/preferences"
        element={
          <LazyWrapper>
            <Preferences />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/api"
        element={
          <LazyWrapper>
            <Api />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/sessions"
        element={
          <LazyWrapper>
            <Sessions />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/ignored-users"
        element={
          <LazyWrapper>
            <IgnoredUsers />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/verify"
        element={
          <LazyWrapper>
            <Verify />
          </LazyWrapper>
        }
      />

      <Route
        path="/settings/others"
        element={
          <LazyWrapper>
            <OtherSettings />
          </LazyWrapper>
        }
      />

      {/* Fallback Route */}
      <Route
        path="*"
        element={
          <LazyWrapper>
            <LandingPage />
          </LazyWrapper>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
