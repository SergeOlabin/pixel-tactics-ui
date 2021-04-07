import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class KnightHero implements IHero {
  public readonly type = CharacterList.Knight;
  public readonly attack = 3;
  public readonly health = 10;

  public vanguardDescription = `
    Intercept. A hero who attacks this hero takes 2 damage.
  `;
  public flankDescription = `
    Your leader takes no damage from ranged attacks.
  `;
  public rearDescription = `
    All heroes in your unit can apply damage freely to this hero.
  `;
  public orderDescription = `
    Do 4 damage to every enemy hero or leader in melee.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class KnightLeader implements ILeader {
  public readonly name = 'Cadenza';
  public readonly attack = 4;
  public readonly health = 20;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your heroes and leader take 1 less damage from attacks.
  `;

  public power() {}
}

export const KnightCharacter: Character = {
  Hero: KnightHero,
  Leader: KnightLeader,
};
