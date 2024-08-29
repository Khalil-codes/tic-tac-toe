import { RefreshCw } from "lucide-react";
import Logo from "../assets/logo.svg";
import { Player as PlayerType } from "../types";
import Player from "./Player";
import { Button } from "./ui/button";

const Header = ({
  player,
  onReset,
}: {
  player: PlayerType;
  onReset: () => void;
}) => (
  <div className="flex items-center justify-between">
    <img src={Logo} alt="Tic Tac Toe" />
    <div className="flex items-center gap-2 rounded bg-gray-700 p-2 text-white">
      <Player player={player} size={20} strokeWidth={3} />
      TURN
    </div>
    <Button
      onClick={onReset}
      variant="secondary"
      className="bg-gray-300 text-gray-800 hover:bg-gray-400">
      <RefreshCw className="h-4 w-4" />
    </Button>
  </div>
);

export default Header;
