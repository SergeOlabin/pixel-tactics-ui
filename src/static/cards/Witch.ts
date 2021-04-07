import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class WitchHero implements IHero {
  public readonly type = CharacterList.Witch;
  public readonly attack = 1;
  public readonly health = 5;

  public vanguardDescription = `
    +1 strength for each corpse in both units.
  `;
  public flankDescription = `
    +4 strength if standing behind a corpse.
  `;
  public rearDescription = `
    Attack: Clear all corpses in a single wave in either unit.
  `;
  public orderDescription = `
    Return all corpses in a single wave to their owner's hand.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class WitchLeader implements ILeader {
  public readonly name = 'Hepzibah Culotre';
  public readonly attack = 3;
  public readonly health = 20;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Corpses in your unit can attack, and have an attack strength of 3. (Corpses are not heroes, do not recieve forerunner or supporter benefits, and do not block melee attacks.)
  `;

  public power() {}
}

export const WitchCharacter: Character = {
  Hero: WitchHero,
  Leader: WitchLeader,
};
