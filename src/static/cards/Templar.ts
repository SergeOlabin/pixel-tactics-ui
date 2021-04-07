import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class TemplarHero implements IHero {
  public readonly type = CharacterList.Templar;
  public readonly attack = 1;
  public readonly health = 6;

  public vanguardDescription = `
    +1 Strength for each damage on this hero.
  `;
  public flankDescription = `
    Supporter takes no damage from attacks targeting him.
  `;
  public rearDescription = `
    Attack: Switch places with any allied hero, then perform a melee attack.
  `;
  public orderDescription = `
    Any hero who attacks or did attack your unit with a melee attack during this wave is defeated.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class TemplarLeader implements ILeader {
  public readonly name = 'Eligor Larington';
  public readonly attack = 4;
  public readonly health = 23;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Heroes in this unit have +5 attack strength if they have taken damage during this wave.
  `;

  public power() {}
}

export const TemplarCharacter: Character = {
  Hero: TemplarHero,
  Leader: TemplarLeader,
};
