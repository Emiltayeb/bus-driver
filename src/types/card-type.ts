export type SuitType = "♠" | "♥" | "♦" | "♣";
export type ColorType = "red" | "black";
export interface CardType {
  value: string;
  suit: SuitType;
  color: ColorType;
  isFromPreviousLevel?: boolean
}
