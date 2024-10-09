import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({
  socket,
  roomId,
  chess,
  board,
  setBoard,
  playerColor,
}: {
  chess: Chess;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket | null;
  roomId: String | null;
  playerColor: String | null;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const isBlackPlayer = playerColor === "black";

  const handleDragStart = (sqRepresentation: Square) => {
    setFrom(sqRepresentation);
  };

  const handleDrop = (sqRepresentation: Square) => {
    if (from) {
      socket?.send(
        JSON.stringify({
          type: "MOVE",
          roomId: roomId,
          move: {
            from,
            to: sqRepresentation,
          },
        })
      );
      chess.move({
        from,
        to: sqRepresentation,
      });
      setBoard(chess.board());
      setFrom(null);
    }
  };

  return (
    <div
      className={`w-full md:w-auto md:h-[88vh] ${
        isBlackPlayer && "rotate-180"
      }`}
    >
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const sqRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      if (square) {
                        setFrom(sqRepresentation);
                      }
                    } else {
                      socket?.send(
                        JSON.stringify({
                          type: "MOVE",
                          roomId: roomId,
                          move: {
                            from,
                            to: sqRepresentation,
                          },
                        })
                      );
                      setFrom(null);
                      chess.move({
                        from,
                        to: sqRepresentation,
                      });
                      setBoard(chess.board());
                      console.log({
                        from,
                        to: sqRepresentation,
                      });
                    }
                  }}
                  key={j}
                  className={`w-full md:w-auto md:h-[11vh] aspect-square text-black border border-yellow-200 ${
                    (i + j) % 2 === 0 ? "bg-white/80" : "bg-transparent"
                  }`}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(sqRepresentation);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="justify-center flex flex-col ">
                      {square ? (
                        <img
                          src={`./piece/${square.type}${square.color}.svg`}
                          className={`w-full md:p-4 ${
                            isBlackPlayer && "rotate-180"
                          }`}
                          alt={`${square.type}`}
                          draggable
                          onDragStart={() => handleDragStart(sqRepresentation)}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
