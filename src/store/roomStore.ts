import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RoomStoreTypes } from './types/interfaces/roomStoreTypes';

export const useRoomState = create(
  devtools<RoomStoreTypes>(() => ({
    players: [],
    roomId: '',
    winner: '',
    status: '',
    closedDeck: [],
  })),
);
