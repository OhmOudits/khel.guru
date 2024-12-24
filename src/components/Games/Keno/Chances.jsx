// eslint-disable-next-line
const Chances = ({ arrayLength, winlength, things }) => {
  const winnedgif = winlength !== -1 ? winlength : 0;

  return (
    <div className="text-base max-lg:text-xs max-xl:text-sm max-sm:text-[0.6rem] font-semibold absolute bottom-2 w-[90%] max-md:w-[98%]">
      <div className="w-full relative items-center justify-around gap-3">
        {/* Grid of Chances */}
        <div className="group flex justify-between w-full">
          {Array.from({ length: arrayLength + 1 }, (_, index) => (
            <button
              key={index}
              className={`py-2 group w-full bg-inactive ${
                winnedgif === index + 1 ? "bg-green-600" : ""
              }`}
            >
              {/* eslint-disable-next-line */}
              {things[arrayLength - 1]?.values[0]?.[index] || 0} x
            </button>
          ))}
        </div>

        {/* Additional Row (Dice or Instruction) */}
        {arrayLength > 0 ? (
          <div className="flex h-[40px] bg-inactive rounded-md mt-2 mb-1">
            {Array.from({ length: arrayLength + 1 }, (_, index) => (
              <div key={index} className="py-2 group text-center w-full">
                {index} x <span className="max-xl:hidden">🎲</span>
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
