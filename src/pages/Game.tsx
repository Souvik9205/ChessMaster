import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../middleware/authMiddleware";
import useSocket from "../hooks/useSocket";
import { ChessBoard } from "../components/ChessBoard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chess } from "chess.js";
import GameOverModal from "../components/GameOverModal";
import { FaCopy, FaUser } from "react-icons/fa";
import axios from "axios";

export const MOVE = "move";

const Game: React.FC = () => {
  const httpURL = "https://chessmaster-server.onrender.com";
  useAuthCheck();
  const socket = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [moveList, setMoveList] = useState<{ white: string; black: string }[]>(
    []
  );
  const [playerColor, setPlayerColor] = useState<string | null>(null);
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [gameOver, setGameOver] = useState<{
    winner: string | null;
    reason: string;
  } | null>(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const storedRoomId = localStorage.getItem("roomId");

    if (!storedRoomId) {
      navigate("/home");
      return;
    }

    setRoomId(storedRoomId);
    if (socket) {
      if (username) {
        socket.send(JSON.stringify({ type: "SET_USERNAME", username }));
      }
      socket.send(JSON.stringify({ type: "JOIN_ROOM", id: roomId }));

      const handleSocketMessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);

        if (message.type === "NOTIFICATION") {
          const newPlayer = message.message;
          setPlayers((prevPlayers) => {
            if (!prevPlayers.includes(newPlayer)) {
              return [...prevPlayers, newPlayer];
            }
            return prevPlayers;
          });
        }

        if (message.type === "INIT_GAME") {
          setChess(new Chess());
          setBoard(chess.board());
          setPlayerColor(message.color);
          toast.success(`Game Started! you are ${message.color}`, {
            position: "top-right",
          });
        }

        if (message.type === "MOVE") {
          const Move = `${message.move.from}-${message.move.to}`;
          const move = message.move;
          chess.move(move);
          setBoard(chess.board());

          setMoveList((prevMoves) => {
            const newMoves = [...prevMoves];
            if (newMoves.length === 0 || newMoves[newMoves.length - 1].black) {
              newMoves.push({ white: Move, black: "" });
            } else {
              newMoves[newMoves.length - 1].black = Move;
            }
            return newMoves;
          });
        }

        if (message.type === "ERROR") {
          toast.error(message.message, {
            position: "top-right",
          });
        }
        if (message.type === "GAME_OVER") {
          const handleGameOver = async () => {
            try {
              if (message.payload.winner == null) {
                setGameOver({ winner: null, reason: "Match Draw" });

                const res = await axios.post(`${httpURL}/end`, {
                  username: username,
                  matches: 1,
                  wins: 0,
                  draws: 1,
                });

                if (res.status !== 200) {
                  toast.error(res.data.message, {
                    position: "top-right",
                  });
                }
              } else {
                const isWinner = message.payload.winner === username;
                setGameOver({
                  winner: message.payload.winner,
                  reason: message.payload.reason,
                });

                const res = await axios.post(`${httpURL}/end`, {
                  username: username,
                  matches: 1,
                  wins: isWinner ? 1 : 0,
                  draws: 0,
                });

                if (res.status !== 200) {
                  toast.error(res.data.message, {
                    position: "top-right",
                  });
                }
              }
            } catch (error) {
              toast.error("Failed to update match result", {
                position: "top-right",
              });
            }
          };

          handleGameOver();
        }

        if (message.type === "GAME_ENDED") {
          setGameOver({ winner: "Game Ended", reason: message.message });
        }
        if (message.type === "DISCONNECT") {
          toast.error(message.message, {
            position: "top-right",
          });
        }
      };

      socket.addEventListener("message", handleSocketMessage);

      return () => {
        socket.removeEventListener("message", handleSocketMessage);
      };
    }
  }, [socket, navigate, username]);

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId).then(() => {
        toast.success("Room ID copied to clipboard!", {
          position: "top-right",
        });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between h-[100vh] bg-gradient-to-br from-neutral-700 via-neutral-800 to-black backdrop-blur-md overflow-hidden">
      <div className="flex flex-col md:w-2/3 md:flex-row justify-center items-center">
        <div className="w-full h-full mt-10 md:mt-20 flex justify-center">
          <ChessBoard
            board={board}
            socket={socket}
            roomId={roomId}
            chess={chess}
            setBoard={setBoard}
            playerColor={playerColor}
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-gradient-to-tr from-white/80 via-white/70 to-white/90 p-6 rounded-lg shadow-md border-2 mt-1 border-yellow-200 h-full">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-700">
          Room ID: {roomId}
          <button
            className="bg-blue-500 text-white rounded-full p-2 ml-4 hover:bg-blue-600 transition duration-300"
            onClick={copyRoomId}
            title="Copy Room ID"
          >
            <FaCopy />
          </button>
        </h2>

        <h3 className="text-xl mb-2 text-gray-700">Players in the Room:</h3>
        <ul className="list-none mb-4 space-y-2 flex justify-around">
          {players.map((player, index) => (
            <li
              key={index}
              className="text-lg flex items-center space-x-2 text-gray-600"
            >
              <FaUser className="text-gray-800" />
              <span>{player}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl mb-2 text-gray-700">Move List:</h3>
        <div className="overflow-y-auto max-h-[15vh] md:max-h-full">
          <table className="table-auto w-full text-center bg-gray-50 rounded-lg shadow-inner">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">White</th>
                <th className="px-4 py-2">Black</th>
              </tr>
            </thead>
            <tbody>
              {moveList.map((move, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-2 text-blue-700 font-semibold">
                    {move.white || "-"}
                  </td>
                  <td className="px-4 py-2 text-red-700 font-semibold">
                    {move.black || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {gameOver && (
        <GameOverModal
          winner={gameOver.winner}
          reason={gameOver.reason}
          onClose={() => setGameOver(null)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Game;
