export interface PlayerStoreTypes {
  id: string;
  name: string;
  avatarId: number;
  host: boolean;
  background?: unknown;
  cardback?: unknown;
  emotion?: unknown;
  timer?: unknown;
  cardsInHand?: unknown;
  setId: (id: string) => void;
  addName: (name: string) => void;
  changeBackground: (background: string) => void;
  changeCardback: (cardback: string) => void;
}
