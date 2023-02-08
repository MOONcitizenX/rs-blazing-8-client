export interface PlayerStoreTypes {
  name: string;
  avatarId: number;
  host: boolean;
  background?: unknown;
  cardback?: unknown;
  emotion?: unknown;
  timer?: unknown;
  cardsInHand?: unknown;
  addName: (name: string) => void;
  changeBackground: (background: string) => void;
  changeCardback: (cardback: string) => void;
}
