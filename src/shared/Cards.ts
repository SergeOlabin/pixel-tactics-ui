import { IHero, ILeader, ICard } from '../pages/game/types/types';
import { AlchemistCharacter } from '../static/cards/Alchemist';
import { makeCardFromCharacter } from './helpers/MakeCard';
import { DragonMageCharacter } from '../static/cards/DragonMage';
import { IllusionistCharacter } from '../static/cards/Illusionist';
import { KnightCharacter } from '../static/cards/Knight';
import { OverlordCharacter } from '../static/cards/Overlord';
import { MascotCharacter } from '../static/cards/Mascot';
import { CharacterList } from '../pages/game/types/character-list';
import { AssassinCharacter } from '../static/cards/Assassin';
import { BerserkerCharacter } from '../static/cards/Berserker';
import { DoppelgangerCharacter } from '../static/cards/Doppelganger';
import { FighterCharacter } from '../static/cards/Fighter';
import { GunnerCharacter } from '../static/cards/Gunner';
import { HealerCharacter } from '../static/cards/Healer';
import { HomunculusCharacter } from '../static/cards/Homunculus';
import { MysticCharacter } from '../static/cards/Mystic';
import { OracleCharacter } from '../static/cards/Oracle';
import { PaladinCharacter } from '../static/cards/Paladin';
import { PlanestalkerCharacter } from '../static/cards/Planestalker';
import { PriestessCharacter } from '../static/cards/Priestess';
import { PyromancerCharacter } from '../static/cards/Pyromancer';
import { ScientistCharacter } from '../static/cards/Scientist';
import { SummonerCharacter } from '../static/cards/Summoner';
import { TemplarCharacter } from '../static/cards/Templar';
import { TrapperCharacter } from '../static/cards/Trapper';
import { VampireCharacter } from '../static/cards/Vampire';
import { WitchCharacter } from '../static/cards/Witch';

type HeroClassType = new (...args: any[]) => IHero;
type LeaderClassType = new (...args: any[]) => ILeader;

export interface Character {
  Hero: HeroClassType;
  Leader: LeaderClassType;
}

export const CARDS: Record<string, ICard> = {
  [CharacterList.Alchemist]: makeCardFromCharacter(AlchemistCharacter),
  [CharacterList.Assassin]: makeCardFromCharacter(AssassinCharacter),
  [CharacterList.Berserker]: makeCardFromCharacter(BerserkerCharacter),
  [CharacterList.Doppelganger]: makeCardFromCharacter(DoppelgangerCharacter),
  [CharacterList.DragonMage]: makeCardFromCharacter(DragonMageCharacter),
  [CharacterList.Fighter]: makeCardFromCharacter(FighterCharacter),
  [CharacterList.Gunner]: makeCardFromCharacter(GunnerCharacter),
  [CharacterList.Healer]: makeCardFromCharacter(HealerCharacter),
  [CharacterList.Homunculus]: makeCardFromCharacter(HomunculusCharacter),
  [CharacterList.Illusionist]: makeCardFromCharacter(IllusionistCharacter),
  [CharacterList.Knight]: makeCardFromCharacter(KnightCharacter),
  [CharacterList.Mascot]: makeCardFromCharacter(MascotCharacter),
  [CharacterList.Mystic]: makeCardFromCharacter(MysticCharacter),
  [CharacterList.Oracle]: makeCardFromCharacter(OracleCharacter),
  [CharacterList.Overlord]: makeCardFromCharacter(OverlordCharacter),
  [CharacterList.Paladin]: makeCardFromCharacter(PaladinCharacter),
  [CharacterList.Planestalker]: makeCardFromCharacter(PlanestalkerCharacter),
  [CharacterList.Priestess]: makeCardFromCharacter(PriestessCharacter),
  [CharacterList.Pyromancer]: makeCardFromCharacter(PyromancerCharacter),
  [CharacterList.Scientist]: makeCardFromCharacter(ScientistCharacter),
  [CharacterList.Summoner]: makeCardFromCharacter(SummonerCharacter),
  [CharacterList.Templar]: makeCardFromCharacter(TemplarCharacter),
  [CharacterList.Trapper]: makeCardFromCharacter(TrapperCharacter),
  [CharacterList.Vampire]: makeCardFromCharacter(VampireCharacter),
  [CharacterList.Witch]: makeCardFromCharacter(WitchCharacter),
};
