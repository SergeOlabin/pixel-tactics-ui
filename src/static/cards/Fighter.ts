import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class FighterHero implements IHero {
  public readonly type = CharacterList.Fighter;
  public readonly attack = 4;
  public readonly health = 8;

  public vanguardDescription = `
    Intercept
  `;
  public flankDescription = `
    +2 strength
  `;
  public rearDescription = `
    +4 strength
  `;
  public orderDescription = `
    Do 5 damage to all heroes in a single column in both units.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class FighterLeader implements ILeader {
  public readonly name = 'Hikaru Sorayama';
  public readonly attack = 4;
  public readonly health = 23;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your heroes have +2 strength when making melee attacks.
  `;

  public power() {}
}

export const FighterCharacter: Character = {
  Hero: FighterHero,
  Leader: FighterLeader,
};
