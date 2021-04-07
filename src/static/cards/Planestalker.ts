import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class PlanestalkerHero implements IHero {
  public readonly type = CharacterList.Planestalker;
  public readonly attack = 3;
  public readonly health = 7;

  public vanguardDescription = `
    Intercept
    Ranged Attack
  `;
  public flankDescription = `
    Forerunner and Supporter have Ranged Attack.
  `;
  public rearDescription = `
    Ranged Attack
  `;
  public orderDescription = `
    Do 5 damage to all heroes in both flanks.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class PlanestalkerLeader implements ILeader {
  public readonly name = 'Zaamassal Kett';
  public readonly attack = 4;
  public readonly health = 19;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    This leader's attack is ranged. All heroes in this unit have ranged attacks.
  `;

  public power() {}
}

export const PlanestalkerCharacter: Character = {
  Hero: PlanestalkerHero,
  Leader: PlanestalkerLeader,
};
