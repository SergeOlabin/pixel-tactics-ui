export enum Players {
  Red = 'Red',
  Blue = 'Blue'
}

export enum Waves {
  Vanguard = 'Vanguard',
  Flank = 'Flank',
  Rear = 'Rear',
}

export enum AttackTypes {
  Melee = 'Melee',
  Range = 'Range'
}

export interface ICard {
  hero: ICardHero,
  leader: ICardLeader,
}

export interface ICardHero {
  type: string,
  health: number,
  attack: number,

  powers: IHeroPowers,
}

export interface IHeroPowers {
  vanguard: IPower,
  flank: IPower,
  rear: IPower,
  order: IPower,
}

export interface ICardLeader {
  name: string,
  health: number,
  attack: number,
  attackType: AttackTypes,

  power: IPower,
}

export interface IBoardCard {
  cardType: string,
  attackType?: AttackTypes,
  corpse?: boolean,
  damage?: number,
  effects?: ICardEffect[],
}

export interface IPower {
  description: string,
  effect: () => any,
  // TODO:
}

export interface ICardEffect {
  // TODO:
}

export interface IHero {
  readonly type: string,
  readonly health: number,
  readonly attack: number,

  readonly vanguardDescription: string,
  readonly flankDescription: string,
  readonly rearDescription: string,
  readonly orderDescription: string,

  vanguardPower(): any,
  flankPower(): any,
  rearPower(): any,
  order(): any,
}

export interface ILeader {
  readonly name: string,
  readonly health: number,
  readonly attack: number,
  readonly attackType: AttackTypes,

  readonly powerDescription: string,
  power(): any,
}

export interface ITurn {
  player: Players,
  wave: Waves,
}
