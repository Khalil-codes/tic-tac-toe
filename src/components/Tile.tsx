import React, { useMemo, useState } from "react";
import { Player as PlayerType, Value } from "../types";
import { cn } from "../lib/utils";
import Player from "./Player";

type Props = {
  value: Value;
  index: number;
  player: PlayerType;
  setValue: (index: number) => void;
  isWinningTile: boolean;
  isGameOver: boolean;
};

const Tile = ({
  value,
  index,
  setValue,
  player,
  isWinningTile,
  isGameOver,
}: Props) => {
  const [hover, setHover] = useState(false);
  const handleClick = () => {
    if (isGameOver || value !== null) return;
    setValue(index);
  };

  const content = useMemo(() => {
    if (value) return <Player player={value} />;
    return null;
  }, [value]);

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
        if (hover) setHover(false);
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
        React.cloneElement(<Player player={player} />, {
          size: "90%",
          strokeWidth: 3,
          className: cn("p-2", {
            "text-accent-primary/80": player === "X",
            "text-accent-secondary/80": player === "O",
          }),
        })}
    </div>
  );
};
export default React.memo(Tile);
