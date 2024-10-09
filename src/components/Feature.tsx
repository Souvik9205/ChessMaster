import ChessPieces from "../model/ChessPiece";
import {
  FaChessKnight,
  FaUserFriends,
  FaTrophy,
  FaChartBar,
} from "react-icons/fa";

function Feature() {
  return (
    <div className="relative w-full h-auto md:h-screen flex flex-col md:flex-row justify-center items-center inset-0">
      <div className="hidden md:block relative w-full md:w-[60%] h-[80vh] overflow-hidden bg-transparent">
        <ChessPieces />
      </div>

      <div className="relative w-full md:w-[40%] h-auto md:h-full text-center text-white flex flex-col justify-center items-center gap-5 z-40 p-5">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold mb-5">Features</h1>
          <div className="opacity-80 m-4 px-5 md:px-10 text-start flex flex-col gap-4">
            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-lg md:text-xl font-semibold flex gap-2 items-center">
                <FaChessKnight />
                <p>Play Against AI</p>
              </div>
              <div className="m-3">
                Challenge our intelligent AI, designed to sharpen your skills
                with each match. Whether you're a beginner or a seasoned
                grandmaster, there's always a new level to conquer.
              </div>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-lg md:text-xl font-semibold flex gap-2 items-center">
                <FaUserFriends />
                <p>Play with Friends</p>
              </div>
              <div className="m-3">
                Create your own private room, invite your friends, and enjoy an
                intense game of chess! It's just you, your strategy, and a
                checkmate waiting to happen.
              </div>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-lg md:text-xl font-semibold flex gap-2 items-center">
                <FaTrophy />
                <p>Compete, Climb, Conquer</p>
              </div>
              <div className="m-3">
                Climb the leaderboard with every win! Track your progress with
                our rating system and see how you rank against players
                worldwide.
              </div>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-lg md:text-xl font-semibold flex gap-2 items-center">
                <FaChartBar />
                <p>Personalized Stats</p>
              </div>
              <div className="m-3">
                Log in with your unique username and dive into detailed insights
                about your performance. Watch yourself grow and improve as you
                play!
              </div>
            </div>
          </div>

          <div>
            <a href="/home">
              <button className="px-8 py-2 border border-white text-white rounded-md shadow-lg transition duration-300 ease-in-out hover:bg-white  hover:text-black hover:shadow-2xl hover:shadow-white/50">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
