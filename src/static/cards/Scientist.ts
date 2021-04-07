import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class ScientistHero implements IHero {
  public readonly type = CharacterList.Scientist;
  public readonly attack = 2;
  public readonly health = 7;

  public vanguardDescription = `
    Attack: Your opponent loses an action during the next wave.
  `;
  public flankDescription = `
    Attack: Draw two cards.
  `;
  public rearDescription = `
    Attack: Another hero this unit makes a melee attack.
  `;
  public orderDescription = `
    Make 3 extra actions during this wave.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class ScientistLeader implements ILeader {
  public readonly name = 'Luc Von Gott';
  public readonly attack = 1;
  public readonly health = 17;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    You have three actions per wave instead of the normal two.
  `;

  public power() {}
}

export const ScientistCharacter: Character = {
  Hero: ScientistHero,
  Leader: ScientistLeader,
};
