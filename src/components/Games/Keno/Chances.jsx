/* eslint-disable react/prop-types */
import "../../../styles/Keno.css";// eslint-disable-next-line
const Chances = ({ arrayLength, winlength, things }) => {
  const winnedgif = winlength !== -1 ? winlength : 0;

  return (
    <div className="text-base max-lg:text-xs max-xl:text-sm max-sm:text-[0.6rem] font-semibold absolute bottom-2 w-[90%] max-md:w-[98%]">
      <div className="w-full relative items-center justify-around gap-3">
        {/* Grid of Chances */}
        <div className="group justify-center w-full">
          <div
            className="grid w-full grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-[1%]"
          >
            {Array.from({ length: arrayLength + 1 }, (_, index) => (
              <button
                key={index}
                
                className={`justify-center py-2 group rounded-lg w-full border-zinc-400 bg-inactive ${winnedgif === index + 1 ? "bg-green-600" : ""
                  }`}
              >
                {/* eslint-disable-next-line react/prop-types */}
                <div
                  style={{ fontSize: 'clamp(9px, 2vw, 0.8vw)' }}
                >
                  {things[arrayLength - 1]?.values[0]?.[index] || 0}x
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Row (Dice or Instruction) */}
        {arrayLength > 0 ? (
          <div className="flex h-[40px] bg-inactive rounded-md mt-2 mb-1">
            {Array.from({ length: arrayLength + 1 }, (_, index) => (
              <div key={index} className="py-2 group text-center w-full flex items-center justify-center">
                <span className="ml-2 text-sm font-medium" style={{ fontSize: 'clamp(9px, 2vw, 0.8vw)' }}>{index}x</span>
                <span className="ml-[0.1rem] flex items-center justify-center" style={{ "--gem-size": "clamp(12px, 2.5vw, 16px)" }}>
                  <div className="container">
                    <div className="sapphire">
                      <div className="shape">
                        <div className="shape top-left"></div>
                        <div className="shape top-right"></div>
                        <div className="shape left"></div>
                        <div className="shape right"></div>
                        <div className="shape bottom-left"></div>
                        <div className="shape bottom-right"></div>
                      </div>
                      <div className="hexagon">
                        <div className="hexagon top"></div>
                        <div className="hexagon middle"></div>
                        <div className="hexagon bottom"></div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[40px] bg-inactive rounded-md mt-2 mb-1 flex items-center justify-center w-full">
            <p className="text-center text-zinc-300 text-sm">
              Select 1 - 10 numbers to play
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chances;
