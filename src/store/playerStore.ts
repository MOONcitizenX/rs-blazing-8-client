import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { backgroundsArray, cardbacksArray } from './basicMedia';
import { PlayerStoreTypes } from './types/interfaces/playerStoreTypes';

export const usePlayerState = create(
  devtools<PlayerStoreTypes>((set) => ({
    id: '',
    name: '',
    avatarId: 0,
    host: true,
    background: backgroundsArray[0],
    cardback: cardbacksArray[0],
    emotion: null,
    timer: 0,
    cardsInHand: 0,

    setId: (id: string) =>
      set((state: PlayerStoreTypes) => {
        return { ...state, id };
      }),

    addName: (name: string) =>
      set((state: PlayerStoreTypes) => {
        return { ...state, name };
      }),

    changeBackground: (background: string) =>
      set((state: PlayerStoreTypes) => {
        return { ...state, background };
      }),

    changeCardback: (cardback: string) =>
      set((state: PlayerStoreTypes) => {
        return { ...state, cardback };
      }),
  })),
);
