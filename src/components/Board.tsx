import { Circle, RefreshCw, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import Logo from "../assets/logo.svg";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

type Player = "X" | "O";
type Value = Player | null;
type BoardState = Array<Value>;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (boardState: BoardState): number[] | null => {
  for (const condition of winningCombinations) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[b] === boardState[c]
    ) {
      return condition;
    }
  }
  return null;
};

const Board = () => {
  const [boardState, setBoardState] = useState<BoardState>(Array(9).fill(null));
  const [player, setPlayer] = useState<Player>("X");
  const [winningTiles, setWinningTiles] = useState<number[] | null>(null);
  const [tied, setTied] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const setValue = (index: number) => {
    if (boardState[index] || winner) return;

    const newState = [...boardState];
    newState[index] = player;
    setBoardState(newState);

    const winningTiles = checkWinner(newState);
    if (winningTiles) {
      setWinningTiles(winningTiles);
      setWinner(player);
    } else if (newState.every((value) => value !== null)) {
      setTied(true);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setBoardState(Array(9).fill(null));
    setPlayer("X");
    setWinningTiles(null);
    setTied(false);
    setWinner(null);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <img src={Logo} alt="Tic Tac Toe" />
        </div>
        <div className="flex items-center gap-2 rounded bg-gray-700 p-2 text-white">
          {player === "X" ? (
            <X size={20} className="text-accent-primary" strokeWidth={5} />
          ) : (
            <Circle
              size={20}
              className="stroke-accent-secondary"
              strokeWidth={3}
            />
          )}
          TURN
        </div>
        <Button
          onClick={handleReset}
          variant="secondary"
          className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-800 p-4">
        {boardState.map((value, index) => (
          <Tile
            value={value}
            key={index}
            index={index}
            setValue={setValue}
            player={player}
            isWinningTile={winningTiles?.includes(index) || false}
            isGameOver={!!winner || tied}
          />
        ))}
      </div>

      {/* Scores */}
      <div className="flex justify-between space-x-3 text-center">
        <div className="bg-accent-primary flex-1 rounded-lg px-4 py-2">
          <p className="text-xs font-semibold">X (YOU)</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="flex-1 rounded-lg bg-gray-500 px-4 py-2">
          <p className="text-xs font-semibold">TIES</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-accent-secondary flex-1 rounded-lg px-4 py-2">
          <p className="text-xs font-semibold">O (CPU)</p>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </>
  );
};

export default Board;

type TileProps = {
  value: Value;
  index: number;
  player: Player;
  setValue: (index: number) => void;
  isWinningTile: boolean;
  isGameOver: boolean;
};

const Tile = React.memo(
  ({
    value,
    index,
    setValue,
    player,
    isWinningTile,
    isGameOver,
  }: TileProps) => {
    const [hover, setHover] = useState(false);
    const handleClick = () => {
      if (isGameOver || value !== null) return;
      setValue(index);
    };

    const content = useMemo(() => {
      if (value === "X") return <X />;
      if (value === "O") return <Circle />;
      return null;
    }, [value]);

    const hoverContent = useMemo(() => {
      if (player === "X") return <X />;
      return <Circle />;
    }, [player]);

    return (
      <div
        className={cn(
          "flex aspect-square items-center justify-center rounded-lg bg-gray-700 shadow-inner transition duration-200",
          {
            "cursor-pointer hover:bg-gray-600": !value && !isGameOver,
            "cursor-not-allowed": value !== null || isGameOver,
            "bg-accent-primary": isWinningTile && value === "X",
            "bg-accent-secondary": isWinningTile && value === "O",
          }
        )}
        onMouseEnter={() => {
          if (isGameOver || value) return;
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={handleClick}>
        {content &&
          React.cloneElement(content, {
            size: "90%",
            strokeWidth: 3,
            className: cn("p-2", {
              "text-accent-primary": value === "X",
              "text-accent-secondary": value === "O",
              "text-gray-800": isWinningTile,
            }),
          })}
        {value === null &&
          hover &&
          React.cloneElement(hoverContent, {
            size: "90%",
            strokeWidth: 3,
            className: cn("p-2", {
              "text-accent-primary/70": player === "X",
              "text-accent-secondary/70": player === "O",
            }),
          })}
      </div>
    );
  }
);
