import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../middleware/authMiddleware";
import useSocket from "../hooks/useSocket";
import ChessBoard from "../components/ChessBoard";

const Game: React.FC = () => {
  useAuthCheck();
  const socket = useSocket();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
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
        alert("Room ID copied to clipboard!");
      });
    }
  };

  return (
    <div className="justify-center flex flex-col items-center pt-8 max-w-screen-lg">
      <h2 className="text-2xl font-bold mb-4">Room ID: {roomId}</h2>
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 mb-4"
        onClick={copyRoomId}
      >
        Copy Room ID
      </button>
      <h3 className="text-xl mb-2">Players in the Room:</h3>
      <ul className="list-disc mb-4">
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <ChessBoard />
    </div>
  );
};

export default Game;
