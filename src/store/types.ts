import { IBoardCard, IPlace } from '../shared/types/types';

export enum ActiveCardLocation {
  Board = 'Board',
  Hand = 'Hand',
  Leader = 'Leader',
}

export type IActiveCardState = {
  card: IBoardCard,
  location: ActiveCardLocation,
  place?: IPlace,
} | null;

