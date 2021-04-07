import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class HealerHero implements IHero {
  public readonly type = CharacterList.Healer;
  public readonly attack = 1;
  public readonly health = 4;

  public vanguardDescription = `
    Intercept
    Takes 2 less damage from attacks.
  `;
  public flankDescription = `
    Attack: Heal up to 4 damage from a hero.
  `;
  public rearDescription = `
    Attack: Heal 2 damage from up to 3 different heroes.
  `;
  public orderDescription = `
    Heal up to 10 damage from heroes. Divide this healing as you wish.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class HealerLeader implements ILeader {
  public readonly name = 'Kavri Shi Shorec';
  public readonly attack = 0;
  public readonly health = 15;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    At the end of each wave, all of your heroes and leaders in that wave heal 2 damage. Perform this step before checking for casualties.
  `;

  public power() {}
}

export const HealerCharacter: Character = {
  Hero: HealerHero,
  Leader: HealerLeader,
};
