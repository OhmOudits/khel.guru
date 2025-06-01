export const CARD_SUITS = ["♦", "♥", "♠", "♣"];
export const CARD_VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "J",
  "Q",
  "K",
  "A",
];

export const getCardValue = (value) => {
  if (value === "A") return 11;
  if (["J", "Q", "K"].includes(value)) return 10;
  return parseInt(value);
};
