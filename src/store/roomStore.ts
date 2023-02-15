import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RoomStoreTypes } from './types/interfaces/roomStoreTypes';
import { TurnDirection } from './types/types/TurnDirection';

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

    changeDirection: (direction: TurnDirection) =>
      set((state: RoomStoreTypes) => {
        return { ...state, direction };
      }),
    setIsCardSuitChoose: (isCardSuitChoose: boolean) => {
      set((state: RoomStoreTypes) => {
        return { ...state, isCardSuitChoose };
      });
    },
  })),
);
