import whiteCoin from "../assets/w-coin.png";
import yellowCoin from "../assets/y-coin.png";
import { useGlobalContext } from "../context/globalContext";

const DailyCoin = ({ day }) => {
  const { continuousToday } = useGlobalContext();

  return (
    <div className="flex flex-col gap-y-3">
      <p>Day {day}</p>
      <div className="bg-white rounded-lg flex flex-col gap-y-1 items-center p-1">
        {day === 3 || day === 6 || day === 7 ? (
          <span>+2</span>
        ) : (
          <span>+1</span>
        )}
        {day < continuousToday ? (
          <img src={yellowCoin} alt="yellow-coin"></img>
        ) : day === continuousToday ? (
          <img
            src={yellowCoin}
            alt="yellow-coin"
            className="animate-bounce"
          ></img>
        ) : (
          <img src={whiteCoin} alt="yellow-coin"></img>
        )}
      </div>
    </div>
  );
};

export default DailyCoin;
