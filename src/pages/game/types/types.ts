import { CharacterList } from './character-list';
import { Positions, Waves } from './game-types';

export enum AttackTypes {
  Melee = 'Melee',
  Range = 'Range',
}

export interface ICard {
  hero: ICardHero;
  leader: ICardLeader;
}

export interface ICardHero {
  type: string;
  health: number;
  attack: number;

  powers: IHeroPowers;
}

export interface IHeroPowers {
  vanguard: IPower;
  flank: IPower;
  rear: IPower;
  order: IPower;
}

export interface ICardLeader {
  name: string;
  health: number;
  attack: number;
  attackType: AttackTypes;

  power: IPower;
  effects?: ICardEffect[];
}

export interface IBoardCard {
  type: CharacterList;
  leader?: boolean;
  attackType?: AttackTypes;
  corpse?: boolean;
  damage?: number;
  effects?: ICardEffect[];
}

export interface IPower {
  description: string;
  effect: () => any;
  // TODO:
}

export interface ICardEffect {
  // TODO:
}

export interface IPlace {
  wave: Waves;
  position: Positions;
}

export interface IHero {
  readonly type: string;
  readonly health: number;
  readonly attack: number;

  readonly vanguardDescription: string;
  readonly flankDescription: string;
  readonly rearDescription: string;
  readonly orderDescription: string;

  vanguardPower(): any;
  flankPower(): any;
  rearPower(): any;
  order(): any;
}

export interface ILeader {
  readonly name: string;
  readonly health: number;
  readonly attack: number;
  readonly attackType: AttackTypes;

  readonly powerDescription: string;
  power(): any;
}

export interface ITurn {
  wave: Waves;
  stage: 'InProgress' | 'Finished' | 'Waiting';
}
