import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthCheck from "../middleware/authMiddleware";
import RoomIdModal from "../components/RoomModal";
import useSocket from "../hooks/useSocket";
import { FaUser, FaSpinner } from "react-icons/fa";

const Home: React.FC = () => {
  useAuthCheck();
  const socket = useSocket();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      const username = localStorage.getItem("username");
      if (username) {
        socket.send(JSON.stringify({ type: "SET_USERNAME", username }));
      }

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "ROOM_CREATED") {
          const roomId = message.roomId;
          localStorage.setItem("roomId", roomId);
          setIsLoadingCreate(false);
          navigate("/game");
        }
      };
    }
  }, [socket, navigate]);

  const handleJoinGameClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateGameClick = () => {
    const username = localStorage.getItem("username");
    if (username && socket) {
      setIsLoadingCreate(true);
      socket.send(JSON.stringify({ type: "CREATE_ROOM" }));
    } else {
      alert("Please set your username first.");
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col md:flex-row gap-6 p-6 items-center justify-center
    bg-gradient-to-br from-neutral-700 via-neutral-800 to-black backdrop-blur-md overflow-hidden"
    >
      <div
        onClick={() => {
          navigate("/dashboard");
        }}
        className="absolute top-8 right-8 p-3 bg-white/20 rounded-full hover:bg-white/10 hover:border hover:border-white/20 cursor-pointer"
      >
        <FaUser className="h-8 w-8" />
      </div>
      <div className="md:w-1/2 w-full flex justify-center items-center">
        <img
          src="./chess.jpeg"
          alt="chess"
          className="w-3/4 h-auto object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in">
          Play Chess with Friends
        </h1>
        <p className="text-lg opacity-90 animate-fade-in delay-500">
          Challenge your friends, join ongoing matches, or play against AI!
        </p>

        <div className="flex flex-col space-y-3 mt-4 animate-fade-in delay-1000">
          <button
            className="bg-green-400 text-black hover:bg-green-300 transition-colors duration-300 py-3 px-6 rounded-full shadow-md transform hover:scale-105"
            onClick={handleCreateGameClick}
          >
            {isLoadingCreate ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
              </>
            ) : (
              "Create Game"
            )}
          </button>

          <button
            className="bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-300 py-3 px-6 rounded-full shadow-md transform hover:scale-105"
            onClick={handleJoinGameClick}
          >
            Join Game
          </button>

          <button className="cursor-not-allowed bg-red-400 text-black hover:bg-red-300 transition-colors duration-300 py-3 px-6 rounded-full shadow-md transform hover:scale-105">
            Play with Bot
          </button>
        </div>
      </div>
      {isModalOpen && <RoomIdModal onClose={handleModalClose} />}
      <ToastContainer />
    </div>
  );
};

export default Home;
