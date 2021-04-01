import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class IllusionistHero implements IHero {
  public readonly type = 'Illusionist';
  public readonly attack = 4;
  public readonly health = 5;

  public vanguardDescription = `
    Attack: Return an allied hero to your hand.
  `;
  public flankDescription = `
    Attack: The opponent must choose and reveal a card from his had. You activate its order.
  `;
  public rearDescription = `
    Attack: Recruit a hero from your hand, perform an attack with it, then discard it.
  `;
  public orderDescription = `
    Randomly take a card from your opponent's hand, use its order effect, then discard it.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class IllusionistLeader implements ILeader {
  public readonly name = 'Borneo';
  public readonly attack = 4;
  public readonly health = 15;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    When an opponent uses a melee attack, you decide which legal target he attacks.
  `;

  public power() {}
}

export const Illusionist: Character = {
  Hero: IllusionistHero,
  Leader: IllusionistLeader,
};
