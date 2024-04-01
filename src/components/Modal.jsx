import DailyCoin from "./DailyCoin";
import { useGlobalContext } from "../context/globalContext";

const Modal = () => {
  const { setShouldModalOpen, totalCoin, continuousToday } = useGlobalContext();

  const closeModal = () => {
    return setShouldModalOpen(false);
  };

  return (
    <div className="fixed inset-0 w-full h-screen grid justify-center z-10">
      <div className="top-[30%] w-[450px] h-[250px] shadow-xl flex flex-col relative rounded-xl">
        <div className="h-[30%] bg-primary grid place-items-center rounded-t-xl">
          <h4 className="text-lg text-white flex items-center">
            累積 S 幣：
            <span className="text-3xl text-yellow-400 pl-3">${totalCoin}</span>
          </h4>
        </div>

        <div className="flex-1 bg-gray-200 rounded-b-xl flex flex-col items-center px-4 pt-8">
          <div className="flex gap-5">
            {Array.from({ length: 7 }, (_, index) => {
              return (
                <DailyCoin
                  key={index + 1}
                  day={index + 1}
                  continuousToday={continuousToday}
                />
              );
            })}
          </div>
          <p className="mt-4 text-lg">
            {continuousToday === 7
              ? "全勤寶貝是你吧?! 要繼續保持唷~"
              : "明天記得回來領取 S 幣!"}
          </p>
        </div>

        <div
          className="absolute top-0 right-0 w-8 h-8 translate-x-[40%] -translate-y-[40%] rounded-full bg-yellow-400 grid place-items-center hover:cursor-pointer"
          onClick={closeModal}
        >
          <span className="text-white text-lg">X</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
