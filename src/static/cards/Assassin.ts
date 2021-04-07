import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class AssassinHero implements IHero {
  public readonly type = CharacterList.Assassin;
  public readonly attack = 3;
  public readonly health = 1;

  public vanguardDescription = `
    Double attack strength against leaders
  `;
  public flankDescription = `
    Forerunner has double printed attack strength against heroes.
  `;
  public rearDescription = `
    Attack: Do 3 damage to an opposing leader.
  `;
  public orderDescription = `
    Immediately defeat any hero.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class AssassinLeader implements ILeader {
  public readonly name = 'Regicide Heketch';
  public readonly attack = 8;
  public readonly health = 15;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your opponent's heroes die immediately when they have lethal damage on them.
  `;

  public power() {}
}

export const AssassinCharacter: Character = {
  Hero: AssassinHero,
  Leader: AssassinLeader,
};
