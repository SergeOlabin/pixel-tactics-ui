import { IHero, ILeader, AttackTypes } from '../../shared/types/types';
import { Character } from '../../shared/Characters';

export class MascotHero implements IHero {
  public readonly type = 'Mascot';
  public readonly attack = 1;
  public readonly health = 4;

  public vanguardDescription = `
    Attack: Another Vanguard hero makes a melee attack.
  `
  public flankDescription = `
    Attack: Another Flank hero makes a ranged attack.
  `
  public rearDescription = `
    Attack: Another Rear hero makes a ranged attack.
  `
  public orderDescription = `
    Activate your leader's order effect.
  `

  public vanguardPower() { }
  public flankPower() { }
  public rearPower() { }
  public order() { }
}

export class MascotLeader implements ILeader {
  public readonly name = 'Borneo';
  public readonly attack = 1;
  public readonly health = 20;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    After the first round of play, when you recruit a hero,
    that hero may immediately make an attack as a free action.
  `;

  public power() {
  }
}

export const Mascot: Character = {
  Hero: MascotHero,
  Leader: MascotLeader,
};
