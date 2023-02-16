import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RoomStoreTypes } from './types/interfaces/roomStoreTypes';

export const useRoomState = create(
  devtools<RoomStoreTypes>((set) => ({
    players: [],
    roomId: '',
    winner: '',
    status: null,
    closedDeck: 0,
    topCard: null,
    direction: 'CW',
    playerTurn: '1',
    isCardSuitChoose: false,
    id: '',

    changeDirection: (direction) =>
      set((state: RoomStoreTypes) => {
        return { ...state, direction };
      }),

    setStatus(status) {
      set((state: RoomStoreTypes) => {
        return { ...state, status };
      });
    },

    setIsCardSuitChoose: (isCardSuitChoose) => {
      set((state: RoomStoreTypes) => {
        return { ...state, isCardSuitChoose };
      });
    },
  })),
);
