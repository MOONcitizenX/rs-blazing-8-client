import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { cardMap } from '../utils/cardsMap';
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

    setNewCards: ({ playerId, nextPlayerId, playerCards, nextPlayerCards }) => {
      set((state: RoomStoreTypes) => {
        const newPlayers = state.players.map((el) => {
          if (el.id === playerId) {
            return {
              ...el,
              cards: playerCards,
            };
          }
          if (el.id === nextPlayerId) {
            return {
              ...el,
              cards: nextPlayerCards,
            };
          }
          return el;
        });
        return { ...state, players: newPlayers };
      });
    },
  })),
);
