import { IHero, ILeader, ICard, CharacterList } from './Types';
import { Alchemist } from './cards/Alchemist';
import { makeCardFromCharacter } from './helpers/MakeCard';
import { DragonMage } from './cards/DragonMage';
import { Illusionist } from './cards/Illusionist';
import { Knight } from './cards/Knight';
import { Overlord } from './cards/Overlord';
import { Mascot } from './cards/Mascot';

type HeroClassType = new (...args: any[]) => IHero;
type LeaderClassType = new (...args: any[]) => ILeader;

export interface Character {
  Hero: HeroClassType,
  Leader: LeaderClassType,
}


export const cards: { [key: string]: ICard } = {
  [CharacterList.Alchemist]: makeCardFromCharacter(Alchemist),
  [CharacterList.DragonMage]: makeCardFromCharacter(DragonMage),
  [CharacterList.Illusionist]: makeCardFromCharacter(Illusionist),
  [CharacterList.Knight]: makeCardFromCharacter(Knight),
  [CharacterList.Mascot]: makeCardFromCharacter(Mascot),
  [CharacterList.Overlord]: makeCardFromCharacter(Overlord),
};

