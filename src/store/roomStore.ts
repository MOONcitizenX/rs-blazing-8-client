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

    changeDirection: (direction: 'CW' | 'ACW') =>
      set((state: RoomStoreTypes) => {
        return { ...state, direction };
      }),
  })),
);
