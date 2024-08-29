import { useCallback, useMemo, useState } from "react";
import type { BoardState, Player, Stats } from "../types";
import Header from "./Header";
import Tile from "./Tile";
import ScoreBoard from "./Score";
import GameOverDialog from "./GameOverDialog";

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

const DEFAULT_STATS: Stats = { X: 0, O: 0, ties: 0 };

const Board = () => {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);
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
      setStats((prev) => ({ ...prev, [player]: prev[player] + 1 }));
    } else if (newState.every((value) => value !== null)) {
      setStats((prev) => ({ ...prev, ties: prev.ties + 1 }));
      setTied(true);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const handleReset = useCallback(() => {
    setBoardState(Array(9).fill(null));
    setPlayer((prev) => (prev === "X" ? "O" : "X"));
    setWinningTiles(null);
    setTied(false);
    setWinner(null);
  }, []);

  const isGameOver = useMemo(() => !!winner || !!tied, [winner, tied]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {/* Header */}
        <Header onReset={handleReset} player={player} />

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
              isGameOver={isGameOver}
            />
          ))}
        </div>

        {/* Scores */}
        <ScoreBoard stats={stats} />
      </div>
      <GameOverDialog
        isGameOver={isGameOver}
        player={player}
        tied={tied}
        handleNextRound={handleReset}
        handleReset={() => {
          handleReset();
          setStats(DEFAULT_STATS);
        }}
      />
    </>
  );
};

export default Board;
