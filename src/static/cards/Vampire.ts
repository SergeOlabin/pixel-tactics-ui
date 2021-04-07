import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class VampireHero implements IHero {
  public readonly type = CharacterList.Vampire;
  public readonly attack = 2;
  public readonly health = 6;

  public vanguardDescription = `
    When this hero deals damage, it heals that much damage.
  `;
  public flankDescription = `
    Forerunner can transfer damage to this hero freely.
  `;
  public rearDescription = `
    Attack: Move up to 2 damage from your leader to any hero.
  `;
  public orderDescription = `
    Move all damage from one hero onto another hero.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class VampireLeader implements ILeader {
  public readonly name = 'Demitras Denigrande';
  public readonly attack = 3;
  public readonly health = 18;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your heroes and leader regain life equal to the damage they deal to opposing heroes.
  `;

  public power() {}
}

export const VampireCharacter: Character = {
  Hero: VampireHero,
  Leader: VampireLeader,
};
