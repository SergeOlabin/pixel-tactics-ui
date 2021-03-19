import { IHero, ILeader, ICard, CharacterList } from './types/types';
import { Alchemist } from '../static/cards/Alchemist';
import { makeCardFromCharacter } from './helpers/MakeCard';
import { DragonMage } from '../static/cards/DragonMage';
import { Illusionist } from '../static/cards/Illusionist';
import { Knight } from '../static/cards/Knight';
import { Overlord } from '../static/cards/Overlord';
import { Mascot } from '../static/cards/Mascot';

type HeroClassType = new (...args: any[]) => IHero;
type LeaderClassType = new (...args: any[]) => ILeader;

export interface Character {
  Hero: HeroClassType,
  Leader: LeaderClassType,
}

export const CARDS: { [key: string]: ICard } = {
  [CharacterList.Alchemist]: makeCardFromCharacter(Alchemist),
  [CharacterList.DragonMage]: makeCardFromCharacter(DragonMage),
  [CharacterList.Illusionist]: makeCardFromCharacter(Illusionist),
  [CharacterList.Knight]: makeCardFromCharacter(Knight),
  [CharacterList.Mascot]: makeCardFromCharacter(Mascot),
  [CharacterList.Overlord]: makeCardFromCharacter(Overlord),
};

