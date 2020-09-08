import { IHero, ILeader, AttackTypes } from '../Types';
import { Character } from '../Characters';

export class OverlordHero implements IHero {
  public readonly type = 'Overlord';
  public readonly attack = 3;
  public readonly health = 7;

  public vanguardDescription = `
    Intercept
  `
  public flankDescription = `
    Attack: Your leader makes a melee attack.
  `
  public rearDescription = `
    Attack: Any hero in your unit makes a melee attack.
  `
  public orderDescription = `
    Recruit as many heroes as you wish to any single wave in your unit.
  `

  public vanguardPower() { }
  public flankPower() { }
  public rearPower() { }
  public order() { }
}

export class OverlordLeader implements ILeader {
  public readonly name = 'Cairngort Rexan';
  public readonly attack = 4;
  public readonly health = 17;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    When an opponent suffers a casualty,
    you can place that hero into an empty place in your unit and restore it to life.
    Heroes revived this way have only 1 life, and are discarded as soon as they are killed.
  `;

  public power() {
  }
}

export const Overlord: Character = {
  Hero: OverlordHero,
  Leader: OverlordLeader,
};
