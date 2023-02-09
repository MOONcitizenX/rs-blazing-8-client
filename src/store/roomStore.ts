import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RoomStoreTypes } from './roomStoreTypes';

export const useRoomState = create(
  devtools<RoomStoreTypes>((set) => ({
    players: [],
    roomId: '',
    userId: null,
    status: null,

    updateUserId: (id: string) => {
      set((state: RoomStoreTypes) => {
        return { ...state, userId: id };
      });
    },

    /* addPlayers: (newPlayer: IPlayerResponse) =>
    set((state: RoomStoreTypes) => {
      return { ...state, players: [...state.players, newPlayer] };
    }), */

    changeStatus: (status: string) =>
      set((state: RoomStoreTypes) => {
        return { ...state, status };
      }),
  })),
);