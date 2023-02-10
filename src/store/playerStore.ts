import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { avatarsArray, backgroundsArray, cardbacksArray } from './basicMedia';
import { PlayerStoreTypes } from './types/interfaces/playerStoreTypes';

export const usePlayerState = create(
  devtools(
    persist<PlayerStoreTypes>(
      (set) => ({
        id: '',
        name: '',
        avatarId: '0',
        avatarImg: avatarsArray[0],
        host: true,
        background: backgroundsArray[0],
        cardback: cardbacksArray[0],
        emotion: null,
        timer: 0,
        cardsInHand: 0,

        changeAvatarImg: (avatarImg: string) =>
          set((state: PlayerStoreTypes) => {
            return { ...state, avatarImg };
          }),

        setId: (id: string) =>
          set((state: PlayerStoreTypes) => {
            return { ...state, id };
          }),

        changeAvatarId: (avatarId: string) =>
          set((state: PlayerStoreTypes) => {
            return { ...state, avatarId };
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
      }),

    changeMusicValue: (music: boolean) =>
      set((state: PlayerStoreTypes) => {
        return { ...state, music };
      }),
    changeSoundValue: (sound: boolean) =>
      set((state: PlayerStoreTypes) => {
        return { ...state, sound };
      }),
  })),
      {
        name: 'playerState',
      },
    ),
  ),

);
