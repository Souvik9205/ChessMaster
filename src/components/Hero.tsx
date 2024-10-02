import Chessboard from "../model/ChessBoard";

function Hero() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center relative">
      <div className="absolute w-full h-[30%] top-14 text-center text-white flex flex-col justify-center items-center gap-5 z-40">
        <h1 className="text-6xl font-semibold mb-5 hover:scale-110 transition duration-300">
          CHESS MASTER
        </h1>
        <p className="text-md font-light mb-8 opacity-70">
          Site to manage and play chess with fun xD
        </p>
        <a href="/home">
          <button className="px-8 py-2 border border-white text-white rounded-md shadow-lg transition duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/50">
            Get Started
          </button>
        </a>
      </div>
      <div className="relative w-full h-[70%]">{/* <Chessboard /> */}</div>
    </div>
  );
}

export default Hero;
