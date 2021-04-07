import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class PyromancerHero implements IHero {
  public readonly type = CharacterList.Pyromancer;
  public readonly attack = 3;
  public readonly health = 3;

  public vanguardDescription = `
    Attack hits all enemy heroes and leaders in melee.
  `;
  public flankDescription = `
    Ranged Attack
    Forerunner has Ranged Attack.
  `;
  public rearDescription = `
    Ranged Attack
  `;
  public orderDescription = `
    Do 7 damage to all heroes in both vanguards.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class PyromancerLeader implements ILeader {
  public readonly name = 'Kallistar Flarechild';
  public readonly attack = 6;
  public readonly health = 17;
  public readonly attackType = AttackTypes.Range;

  public readonly powerDescription = `
    This leader's attack is ranged. When you are first player, heroes in this unit have +3 strength. Otherwise, they take 1 less damage from attacks.
  `;

  public power() {}
}

export const PyromancerCharacter: Character = {
  Hero: PyromancerHero,
  Leader: PyromancerLeader,
};
