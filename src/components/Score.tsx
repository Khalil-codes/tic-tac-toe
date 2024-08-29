import { cn } from "../lib/utils";
import { Stats } from "../types";

const ScoreBoard = ({ stats }: { stats: Stats }) => (
  <div className="flex justify-between space-x-3 text-center">
    <ScoreCard label="X (P1)" value={stats.X} accent="primary" />
    <ScoreCard label="TIES" value={stats.ties} accent="neutral" />
    <ScoreCard label="O (P2)" value={stats.O} accent="secondary" />
  </div>
);

export default ScoreBoard;

const ScoreCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "primary" | "secondary" | "neutral";
}) => (
  <div
    className={cn(
      "flex flex-1 flex-col items-center justify-between rounded-lg px-4 py-2 text-gray-800",
      {
        "bg-accent-primary": accent === "primary",
        "bg-accent-secondary": accent === "secondary",
        "bg-gray-300": accent === "neutral",
      }
    )}>
    <p className="text-sm font-semibold">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);
