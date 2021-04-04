import { CharacterList } from './character-list';
import { IPlace } from './game-types';

// types
export enum GameEventTypes {
  DrawCard = 'drawCard',
  DrawCardsForLeader = 'drawCardsForLeader',
  NextTurn = 'nextTurn',
  Move = 'move',
  PlayCard = 'playCard',
  SelectLeader = 'selectLeader',
}

// PAYLOADS
export interface IBaseGameEventPayload {
  userId: string;
}

export interface IDrawCardPayload extends IBaseGameEventPayload {
  cardsAmount?: number;
}

export interface ISelectLeaderPayload extends IBaseGameEventPayload {
  type: CharacterList;
}

export interface IPlayCardPayload extends IBaseGameEventPayload {
  // from hand always
  toPlace: IPlace;
  cardType: CharacterList;
}

export enum GameEventTypesToClient {
  SelectLeaderReq = 'ToClient/selectLeaderReq',
}
