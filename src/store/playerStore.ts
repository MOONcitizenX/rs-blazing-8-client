import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { avatarsArray, backgroundsArray, cardbacksArray } from './basicMedia';
import { PlayerStoreTypes } from './types/interfaces/playerStoreTypes';

export const usePlayerState = create<PlayerStoreTypes>()(
  devtools(
    persist(
      (set) => ({
        name: '',
        avatarId: '0',
        avatarImg: avatarsArray[0],
        host: true,
        sound: false,
        music: false,
        background: backgroundsArray[0],
        cardback: cardbacksArray[0],
        emotion: null,
        cardsSort: '',
        musicVolume: 1,
        soundVolume: 1,

        changeMusicVolume(musicVolume) {
          set((state: PlayerStoreTypes) => {
            return { ...state, musicVolume };
          });
        },

        changeSoundVolume(soundVolume) {
          set((state: PlayerStoreTypes) => {
            return { ...state, soundVolume };
          });
        },

        changeAvatarImg: (avatarImg: string) =>
          set((state: PlayerStoreTypes) => {
            return { ...state, avatarImg };
          }),

        changeCardsSort(cardsSort) {
          set((state: PlayerStoreTypes) => {
            return { ...state, cardsSort };
          });
        },

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

        changeMusicValue: (music: boolean) =>
          set((state: PlayerStoreTypes) => {
            return { ...state, music };
          }),

        changeSoundValue: (sound: boolean) =>
          set((state: PlayerStoreTypes) => {
            return { ...state, sound };
          }),
      }),
      {
        name: 'playerState',
      },
    ),
  ),
);
