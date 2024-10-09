import React from "react";

interface GameOverModalProps {
  winner: string | null;
  reason: string;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  reason,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ease-out">
      <div className="bg-black/60 border border-yellow-200 p-8 rounded-xl shadow-2xl transform scale-100 transition-transform duration-300 ease-in-out text-center max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-4 text-yellow-300">
          Game Over
        </h2>
        <p className="text-xl mb-4 text-gray-100">
          {winner ? `${winner} won!` : "It's a draw!"}
        </p>
        <p className="text-md mb-6 text-gray-400">{reason}</p>
        <button
          onClick={onClose}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-full shadow-md transition-colors duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
