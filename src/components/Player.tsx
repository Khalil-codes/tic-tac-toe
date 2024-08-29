import { Circle, LucideProps, X } from "lucide-react";
import { Player as PlayerType } from "../types";
import { cn } from "../lib/utils";

type Props = {
  player: PlayerType;
} & LucideProps;

const Player = ({ player, ...props }: Props) => {
  const Icon = player === "X" ? X : Circle;
  const color =
    player === "X" ? "text-accent-primary" : "text-accent-secondary";

  return <Icon {...props} className={cn(color, props.className)} />;
};

export default Player;
