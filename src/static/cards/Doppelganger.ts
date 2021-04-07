import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class DoppelgangerHero implements IHero {
  public readonly type = CharacterList.Doppelganger;
  public readonly attack = 3;
  public readonly health = 5;

  public vanguardDescription = `
    Attack: Copy the attack power of any other vanguard hero.
  `;
  public flankDescription = `
    Attack: Copy the attack power of any other flank hero.
  `;
  public rearDescription = `
    Attack: Copy the attack power of any other rear hero.
  `;
  public orderDescription = `
    Reveal an order from your hand, and execute its effects.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class DoppelgangerLeader implements ILeader {
  public readonly name = 'Sagas Seities';
  public readonly attack = 2;
  public readonly health = 18;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    This leader has the same leader ability, life total, and attack strength as your opponent's leader. (Only use its printed stats if you can't copy.)
  `;

  public power() {}
}

export const DoppelgangerCharacter: Character = {
  Hero: DoppelgangerHero,
  Leader: DoppelgangerLeader,
};
