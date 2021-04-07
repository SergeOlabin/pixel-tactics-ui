import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class TrapperHero implements IHero {
  public readonly type = CharacterList.Trapper;
  public readonly attack = 4;
  public readonly health = 5;

  public vanguardDescription = `
    Intercept
    Immune to ranged attacks.
  `;
  public flankDescription = `
    Forerunner has Intercept. Supporter has ranged attack.
  `;
  public rearDescription = `
    Attack: The opponent must discard a card at random.
  `;
  public orderDescription = `
    The opponent must discard 3 cards at random.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class TrapperLeader implements ILeader {
  public readonly name = 'Khadath Ahemusei';
  public readonly attack = 5;
  public readonly health = 19;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    This leader has ranged attack. All of your heroes have intercept.
  `;

  public power() {}
}

export const TrapperCharacter: Character = {
  Hero: TrapperHero,
  Leader: TrapperLeader,
};
