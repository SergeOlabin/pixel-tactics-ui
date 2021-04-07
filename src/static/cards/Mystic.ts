import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class MysticHero implements IHero {
  public readonly type = CharacterList.Mystic;
  public readonly attack = 1;
  public readonly health = 7;

  public vanguardDescription = `
    Intercept
    Attack: Remove all damage from this hero.
  `;
  public flankDescription = `
    Forefunner has +2 strength and takes 1 less damage from attacks.
  `;
  public rearDescription = `
    Attack: Draw a card. You may play it as an order as a free action.
  `;
  public orderDescription = `
    Play any number of orders from your hand.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class MysticLeader implements ILeader {
  public readonly name = 'Tatsumi Nuoc';
  public readonly attack = 1;
  public readonly health = 19;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Playing an order is a free action for you.
  `;

  public power() {}
}

export const MysticCharacter: Character = {
  Hero: MysticHero,
  Leader: MysticLeader,
};
