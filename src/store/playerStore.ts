import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { backgroundsArray, cardbacksArray } from './basicMedia';
import { PlayerStoreTypes } from './playerStoreTypes';

export const usePlayerState = create(
  devtools<PlayerStoreTypes>((set) => ({
    name: '',
    avatarId: 0,
    host: true,
    background: backgroundsArray[0],
    cardback: cardbacksArray[0],
    emotion: null,
    timer: 0,
    cardsInHand: 0,

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
