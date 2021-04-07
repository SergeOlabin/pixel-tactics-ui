import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class DragonMageHero implements IHero {
  public readonly type = CharacterList.DragonMage;
  public readonly attack = 6;
  public readonly health = 3;

  public vanguardDescription = `
    Attack: Defeat a hero in melee.
  `;
  public flankDescription = `
    Supporter has +3 attack strength.
  `;
  public rearDescription = `
    Ranged Attack
  `;
  public orderDescription = `
    Give a hero +5 attack strength until the end of this wave.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class DragonMageLeader implements ILeader {
  public readonly name = 'Adjenna Callista';
  public readonly attack = 3;
  public readonly health = 17;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your opponent cannot use the 'clear corpse' action.
    (They can still clear corpses by other effects, like Orders and Attack Powers.)
  `;

  public power() {}
}

export const DragonMageCharacter: Character = {
  Hero: DragonMageHero,
  Leader: DragonMageLeader,
};
