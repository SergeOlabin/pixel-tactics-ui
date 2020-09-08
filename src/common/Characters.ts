import { IHero, ILeader, ICard } from './Types';
import { Alchemist } from './cards/Alchemist';
import { makeCardFromCharacter } from './helpers/MakeCard';

type HeroClassType = new (...args: any[]) => IHero;
type LeaderClassType = new (...args: any[]) => ILeader;

export interface Character {
  Hero: HeroClassType,
  Leader: LeaderClassType,
}

enum CharacterList {
  Alchemist = 'Alchemist',
}

export const cards: { [key: string]: ICard } = {
  [CharacterList.Alchemist]: makeCardFromCharacter(Alchemist),
};

