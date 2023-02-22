import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RoomStoreTypes } from './types/interfaces/roomStoreTypes';

export const useRoomState = create(
  devtools<RoomStoreTypes>((set) => ({
    players: [],
    roomId: '',
    winner: null,
    status: null,
    closedDeck: 48,
    topCard: null,
    direction: 'CW',
    playerTurn: '1',
    isCardSuitChoose: false,
    id: '',
    oneCardLeft: false,
    error: '',

    changeDirection: (direction) =>
      set((state: RoomStoreTypes) => {
        return { ...state, direction };
      }),

    setStatus(status) {
      set((state: RoomStoreTypes) => {
        return { ...state, status };
      });
    },

    setWinner(winner) {
      set((state: RoomStoreTypes) => {
        return { ...state, winner };
      });
    },

    setError(error) {
      set((state: RoomStoreTypes) => {
        return { ...state, error };
      });
    },

    setIsCardSuitChoose: (isCardSuitChoose) => {
      set((state: RoomStoreTypes) => {
        return { ...state, isCardSuitChoose };
      });
    },
  })),
);
