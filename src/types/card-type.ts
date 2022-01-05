export type SuitType = "♠" | "♥" | "♦" | "♣";
export type ColorType = "red" | "black";
export interface CardType {
  value: any;
  suit: SuitType;
  color: ColorType;
}
