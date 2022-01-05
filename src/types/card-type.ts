export type SuitType = "♠" | "♥" | "♦" | "♣";
export type ColorType = "red" | "black";
export interface CardType {
  value: number | string;
  suit: SuitType;
  color: ColorType;
}
