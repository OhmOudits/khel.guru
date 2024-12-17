// eslint-disable-next-line
const History = ({ list }) => {
  return (
    ( list &&     <div className="text-sm z-[10] absolute top-2 overflow-y-hidden left-0 w-full flex justify-end gap-2 ml-4 px-5 py-2">
      {/* eslint-disable-next-line */}
      {list.map((l ,index) => (
        <div
          className={`px-6 rounded-full py-1.5 bg-primary font-semibold ${l.chance === true ? `bg-[#1FFF20]` :"bg-black"}`}
          key={index}
        >
          {l.value}
        </div>
      ))}
    </div>
    )
  );
};

export default History;
