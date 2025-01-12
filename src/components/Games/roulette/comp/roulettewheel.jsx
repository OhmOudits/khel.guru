const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const getNumberColor = (num) => {
  if (num === 0) return "bg-green-600 z-10";
  return WHEEL_NUMBERS.indexOf(num) % 2 === 0 ? "bg-red-600" : "bg-zinc-900";
};

export function RouletteWheel({ spinning, currentNumber }) {
  return (
    <div className="relative w-[400px]  h-[400px]">
      <div className="absolute inset-0 rounded-full border-[12px] border-zinc-800" />

      <div className="absolute inset-[24px] rounded-full overflow-hidden">
        <div className="absolute inset-0 ml-5">
          {WHEEL_NUMBERS.map((number, index) => {
            const angle = (index * 360) / WHEEL_NUMBERS.length;
            const rotation = `rotate(${angle}deg)`;

            return (
              <div
                key={number}
                className={`absolute left-1/2 top-0 h-1/2 -ml-6 w-7 origin-bottom ${getNumberColor(
                  number
                )}`}
                style={{ transform: rotation }}
              >
                <span
                  className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-sm font-bold transform -rotate-[${angle}deg]"
                  style={{ transform: `translateX(-50%) rotate(-${angle}deg)` }}
                >
                  {number}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* CENTre ring */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-20 h-20 rounded-full bg-zinc-800  flex items-center justify-center z-50"></div>
      </div>

      <div className="absolute inset-[16px] rounded-full border-4 border-zinc-700" />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom transition-all duration-[4000ms] ease-out"
        style={{
          transform: spinning
            ? `rotate(${
                2160 +
                WHEEL_NUMBERS.indexOf(currentNumber) *
                  (350 / WHEEL_NUMBERS.length)
              }deg)`
            : `rotate(${
                WHEEL_NUMBERS.indexOf(currentNumber) *
                (360 / WHEEL_NUMBERS.length)
              }deg)`,
        }}
      >
        <div className="w-4 h-[180px] flex justify-center">
          <div className="w-3 h-3 rounded-full bg-white shadow-lg" />
        </div>
      </div>

      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 z-10 h-6 bg-yellow-400" />
    </div>
  );
}
