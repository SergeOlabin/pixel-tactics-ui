import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class AlchemistHero implements IHero {
  public readonly type = CharacterList.Alchemist;
  public readonly attack = 2;
  public readonly health = 4;

  public vanguardDescription = `
    Intercept
    Takes 2 less damage from attacks.
  `;
  public flankDescription = `
    Your leader takes 2 less damage from attacks.
  `;
  public rearDescription = `
    Attack: Apply 1 damage to up to 5 different heroes.
  `;
  public orderDescription = `
    Apply 7 damage to heroes. You may divide this damage as you wish
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class AlchemistLeader implements ILeader {
  public readonly name = 'Lixis Ran Kanda';
  public readonly attack = 2;
  public readonly health = 14;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    All opposing heroes take 1 damage at the end of each wave (before casualties are checked.)
  `;

  public power() {}
}

export const AlchemistCharacter: Character = {
  Hero: AlchemistHero,
  Leader: AlchemistLeader,
};
