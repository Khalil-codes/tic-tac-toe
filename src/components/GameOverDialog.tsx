import { cn } from "../lib/utils";
import { Player as PlayerType } from "../types";
import Player from "./Player";
import { Button } from "./ui/button";

type Props = {
  isGameOver: boolean;
  player: PlayerType;
  tied: boolean;
  handleNextRound: () => void;
  handleReset: () => void;
};

const GameOverDialog = ({
  isGameOver,
  player,
  tied,
  handleNextRound,
  handleReset,
}: Props) => (
  <dialog
    open={isGameOver}
    className={cn(
      "scale-0 transition duration-300",
      "flex items-center justify-center",
      "min-h-screen w-screen bg-black/50",
      {
        "scale-1": isGameOver,
      }
    )}>
    <div
      className={cn(
        "flex min-h-40 w-full flex-col items-center justify-center gap-6 bg-gray-800 py-10 font-bold"
      )}>
      {!tied && (
        <p className="font-bold uppercase text-gray-300">
          {player === "X" ? "You Won!" : "Player 2 Wins!"}
        </p>
      )}
      <p
        className={cn("flex items-center gap-3 text-4xl uppercase", {
          "text-accent-primary": player === "X",
          "text-accent-secondary": player === "O",
          "text-gray-300": tied,
        })}>
        {tied ? (
          "Round Tied!"
        ) : (
          <>
            <Player player={player} size={80} strokeWidth={3} />
            Takes the Round
          </>
        )}
      </p>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleReset}
          className="bg-gray-300 text-lg font-bold uppercase text-gray-800">
          Reset
        </Button>
        <Button
          onClick={handleNextRound}
          className="bg-accent-secondary hover:bg-accent-secondary/95 text-lg font-bold uppercase text-gray-800">
          Next Round
        </Button>
      </div>
    </div>
  </dialog>
);

export default GameOverDialog;
