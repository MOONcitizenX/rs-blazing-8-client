import { IPlayerResponse } from '../API/types/interfaces/IPlayerResponse';

export const getPlayerIndex = (players: IPlayerResponse[], plId: string) =>
  players.findIndex((pl) => pl.id === plId);
