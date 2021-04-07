import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class PriestessHero implements IHero {
  public readonly type = CharacterList.Priestess;
  public readonly attack = 1;
  public readonly health = 7;

  public vanguardDescription = `
    Attack: Heal up to 4 damage from a hero.
  `;
  public flankDescription = `
    Attack: Heal up to 2 damage from your leader.
  `;
  public rearDescription = `
    Attack: Restore a corpse to life. This hero takes damage equal to the restored hero's life.
  `;
  public orderDescription = `
    Restore a corpse to full life.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class PriestessLeader implements ILeader {
  public readonly name = 'Magdelina Larington';
  public readonly attack = 0;
  public readonly health = 19;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your heroes and leader regain life equal to the damage they deal to opposing heroes.
  `;

  public power() {}
}

export const PriestessCharacter: Character = {
  Hero: PriestessHero,
  Leader: PriestessLeader,
};
