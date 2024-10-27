const History = () => {
  const list = [2.2, 1.34, 1.53, 0.43, 1.42, 0.63, 2.2, 1.34, 1.53, 0.43, 1.42];

  return (
    <div className="text-sm absolute top-2 overflow-y-hidden left-0 w-full flex justify-end gap-2 ml-4 px-5 py-2">
      {list.map((l, index) => (
        <div
          className="px-6 rounded-full py-1.5 bg-primary font-semibold"
          key={index}
        >
          {l}
        </div>
      ))}
    </div>
  );
};

export default History;
