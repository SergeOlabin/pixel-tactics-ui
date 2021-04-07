import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class GunnerHero implements IHero {
  public readonly type = CharacterList.Gunner;
  public readonly attack = 5;
  public readonly health = 4;

  public vanguardDescription = `
    Ranged Attack
    +3 strength against intercepting heroes.
  `;
  public flankDescription = `
    Ranged Attack
    Supporter has ranged attack.
  `;
  public rearDescription = `
    Ranged Attack
  `;
  public orderDescription = `
    Do 4 damage to all heroes in both rear waves.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class GunnerLeader implements ILeader {
  public readonly name = 'Rukyuk Amberdeen';
  public readonly attack = 5;
  public readonly health = 18;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    This leader's attack is ranged. Whenever you play an order, apply 3 damage to a hero.
  `;

  public power() {}
}

export const GunnerCharacter: Character = {
  Hero: GunnerHero,
  Leader: GunnerLeader,
};
