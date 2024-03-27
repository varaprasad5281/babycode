import LgImg from "../assets/images/boy-image.png";
import SmImg from "../assets/images/sm-screen-boy.png";

const ShareApp = () => {
  return (
    <div className="relative h-[30vh] sm:h-[40vh] md:h-full mb-20 w-full flex justify-start">
      <img
        src={LgImg}
        alt=""
        className="h-full w-full object-right-top object-cover rounded-2xl hidden md:inline-block"
      />
      <img
        src={SmImg}
        alt=""
        className="h-full w-full object-left object-cover rounded-3xl inline-block md:hidden"
      />
      <div className="absolute flex flex-col items-start md:items-center text-start md:text-center gap-2 sm:gap-5 md:gap-1 left-[45%] top-[50%] -translate-y-[50%] md:bottom-5 md:left-[50%] md:-translate-x-[50%] w-auto md:w-[70%] md:pr-0 pr-2 py-3">
        <h3 className="font-jacquesFrancois text-2xl md:text-3xl text-white font-medium text-wrap">
          One Share can save many lives
        </h3>
        <p className="text-gray-300 text-md text-wrap">
          Your one share can unlock a world of education for unprivileged.
        </p>
        <button className="bg-white hover:bg-slate-200 transition-colors duration-300 rounded-full text-gray-700 py-2 px-10 md:px-5 mt-1">
          Share App
        </button>
      </div>
    </div>
  );
};

export default ShareApp;
