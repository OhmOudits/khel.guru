import { useNavigate } from "react-router-dom";

export const TransactionType = ({ type }) => {
  const types = ["Deposits", "Withdrawls", "Bet Archeive", "Other"];
  const navigate = useNavigate()
  return (
    <div className="w-[200px] h-fit py-2 rounded-md bg-gray-900">
      {types.map((i, index) => {
        return <div onClick={()=>navigate(`/transactions/${i.toLowerCase().replace(' ','-')}`)} key={index} className={`py-4 cursor-pointer pl-3 pr-10 ${type==i ? "border-l-4 bg-gray-700 border-green-500" :""}`}>
            <div>{i}</div>
        </div>;
      })}
    </div>
  );
};
