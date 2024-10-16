const BeforeComps = () => {
  return (
    <>
      <div className="bg-container">
        <div className="outer-frame-main">
          <div className="outer-frame-top-section">
            <div className="outer-frame-sidebar">
              <div className="game-mode-type">
                <button className="game-mode-button"> Manual </button>
                <button className="game-mode-button"> Auto </button>
              </div>

              <div className="bet-amount-container">
                <div className="top-text-card">
                  <span> Bet Amount </span>
                  <span> $0.00 </span>
                </div>
                <div className="bet-amount-input-and-button-container">
                  <div>
                    <input type="number" value="0.0000001" />
                    <i className="icon"></i>
                  </div>

                  <button className="bit-amount-button">1/2</button>
                  <button className="bit-amount-button">2x</button>
                </div>
              </div>

              <div className="profit-win-container">
                <div className="top-text-card">
                  <span> Profit on Win </span>
                  <span> $0.00 </span>
                </div>
                <div className="profit-win-input-container">
                  <input type="number" value="0.00000000001" />
                  <i className="icon"></i>
                </div>
              </div>

              <button className="bet-button"> Bet </button>
            </div>

            <div className="outer-frame-body">
              <p>1.28x</p>
            </div>
          </div>

          <div className="outer-frame-taskbar">
            <p> Task Bar </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeComps;
