export type Player = "X" | "O";
export type Value = Player | null;
export type BoardState = Array<Value>;
export type Stats = { X: number; O: number; ties: number };
