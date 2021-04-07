import { IHero, ILeader, ICard } from '../pages/game/types/types';
import { AlchemistCharacter } from '../static/cards/Alchemist';
import { makeCardFromCharacter } from './helpers/MakeCard';
import { DragonMageCharacter } from '../static/cards/DragonMage';
import { IllusionistCharacter } from '../static/cards/Illusionist';
import { KnightCharacter } from '../static/cards/Knight';
import { OverlordCharacter } from '../static/cards/Overlord';
import { MascotCharacter } from '../static/cards/Mascot';
import { CharacterList } from '../pages/game/types/character-list';

type HeroClassType = new (...args: any[]) => IHero;
type LeaderClassType = new (...args: any[]) => ILeader;

export interface Character {
  Hero: HeroClassType;
  Leader: LeaderClassType;
}

export const CARDS: { [key: string]: ICard } = {
  [CharacterList.Alchemist]: makeCardFromCharacter(AlchemistCharacter),
  [CharacterList.DragonMage]: makeCardFromCharacter(DragonMageCharacter),
  [CharacterList.Illusionist]: makeCardFromCharacter(IllusionistCharacter),
  [CharacterList.Knight]: makeCardFromCharacter(KnightCharacter),
  [CharacterList.Mascot]: makeCardFromCharacter(MascotCharacter),
  [CharacterList.Overlord]: makeCardFromCharacter(OverlordCharacter),
};
