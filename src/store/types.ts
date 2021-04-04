import { IPlace } from '../pages/game/types/game-types';
import { IBoardCard } from '../pages/game/types/types';

export enum ActiveCardLocation {
  Board = 'Board',
  Hand = 'Hand',
  Leader = 'Leader',
}

export type IActiveCardState = {
  card: IBoardCard;
  location: ActiveCardLocation;
  place?: IPlace;
} | null;
