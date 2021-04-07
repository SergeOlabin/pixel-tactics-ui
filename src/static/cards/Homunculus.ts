import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class HomunculusHero implements IHero {
  public readonly type = CharacterList.Homunculus;
  public readonly attack = 3;
  public readonly health = 7;

  public vanguardDescription = `
    Intercept
    +2 attack strength.
  `;
  public flankDescription = `
    Attack: Move up to 7 damage from heroes in this unit onto this hero.
  `;
  public rearDescription = `
    Rear allied heroes may apply damage take to this hero.
  `;
  public orderDescription = `
    You may rearrange heroes and corpses in your unit freely.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class HomunculusLeader implements ILeader {
  public readonly name = 'Kehrolyn Ross';
  public readonly attack = 0;
  public readonly health = 36;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    When applying damage to heroes, apply any damage that would be lethal (equal to or exceeding the hero's life) to this leader instead. (If a hero with 4 life takes 5 damage, 3 goes to the hero and 2 to Kehrolyn.
  `;

  public power() {}
}

export const HomunculusCharacter: Character = {
  Hero: HomunculusHero,
  Leader: HomunculusLeader,
};
