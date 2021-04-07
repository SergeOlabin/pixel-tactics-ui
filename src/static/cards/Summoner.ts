import { CharacterList } from '../../pages/game/types/character-list';
import { IHero, ILeader, AttackTypes } from '../../pages/game/types/types';
import { Character } from '../../shared/Cards';

export class SummonerHero implements IHero {
  public readonly type = CharacterList.Summoner;
  public readonly attack = 2;
  public readonly health = 5;

  public vanguardDescription = `
    Attack: Return a hero in melee to its owner's hand.
  `;
  public flankDescription = `
    Attack: Recurit a hero into any row in your unit.
  `;
  public rearDescription = `
    Attack: Draw 3 cards. Put one in your hand, one back on top of the deck, and discard one.
  `;
  public orderDescription = `
    Name a card. Search your deck for it. If you find it, place it in your hand. Reshuffle your deck.
  `;

  public vanguardPower() {}
  public flankPower() {}
  public rearPower() {}
  public order() {}
}

export class SummonerLeader implements ILeader {
  public readonly name = 'Lesandra Machan';
  public readonly attack = 1;
  public readonly health = 21;
  public readonly attackType = AttackTypes.Melee;

  public readonly powerDescription = `
    Your heroes and leader regain life equal to the damage they deal to opposing heroes.
  `;

  public power() {}
}

export const SummonerCharacter: Character = {
  Hero: SummonerHero,
  Leader: SummonerLeader,
};
