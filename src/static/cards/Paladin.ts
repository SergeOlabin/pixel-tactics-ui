import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class PaladinHero implements IHero {
  public readonly type = CharacterList.Paladin;
  public readonly attack = 4;
  public readonly health = 6;

  public vanguardDescription = `
    Intercept
  `;
  public flankDescription = `
    Attack: Swap positions of two allied heroes or corpses in your unit.
  `;
  public rearDescription = `
    Attack: Swap positions of two opposing heroes or corpses.
  `;
  public orderDescription = `
    Freely rearrange your opponent's heroes and corpses in a single column.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class PaladinLeader implements ILeader {
  public readonly name = 'Vanaah Kalmor';
  public readonly attack = 3;
  public readonly health = 20;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Restructuring is a free action for you. Clearing corpses is a free action for you.
  `;

  public power() {}
}

export const PaladinCharacter: Character = {
  Hero: PaladinHero,
  Leader: PaladinLeader,
};
