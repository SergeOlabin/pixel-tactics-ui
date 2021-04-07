import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class OracleHero implements IHero {
  public readonly type = CharacterList.Oracle;
  public readonly attack = 2;
  public readonly health = 4;

  public vanguardDescription = `
    Attack: Look at the opponent's hand and discard one card in it.
  `;
  public flankDescription = `
    Attack: Look at the top 5 cards in your deck. Reorder them as you like.
  `;
  public rearDescription = `
    You may freely look at the top card of your deck.
  `;
  public orderDescription = `
    Discard your hand and draw the same number of cards you discarded, plus one. (This card is not in your hand.)
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class OracleLeader implements ILeader {
  public readonly name = 'Seth Cremmul';
  public readonly attack = 3;
  public readonly health = 20;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your opponent plays with his hand revealed.
  `;

  public power() {}
}

export const OracleCharacter: Character = {
  Hero: OracleHero,
  Leader: OracleLeader,
};
