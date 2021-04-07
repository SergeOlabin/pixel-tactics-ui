import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class BerserkerHero implements IHero {
  public readonly type = CharacterList.Berserker;
  public readonly attack = 3;
  public readonly health = 6;

  public vanguardDescription = `
    Takes 1 less damage from attacks, and has +2 attack strength.
  `;
  public flankDescription = `
    A hero who attacks this unit in melee suffers 2 damage.
  `;
  public rearDescription = `
    The first time that you play an order each rear wave, this hero makes a free ranged attack.
  `;
  public orderDescription = `
    The first hero in each column of your unit performs a melee attack.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class BerserkerLeader implements ILeader {
  public readonly name = 'Shekhtur Lenmorre';
  public readonly attack = 4;
  public readonly health = 19;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Whenever a hero in this unit is defeated, that hero immediately makes a free melee attack. (The damage from this attack occurs after checking all casualties if it happens during the end of a wave.)
  `;

  public power() {}
}

export const BerserkerCharacter: Character = {
  Hero: BerserkerHero,
  Leader: BerserkerLeader,
};
