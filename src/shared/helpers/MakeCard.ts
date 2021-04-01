import {
  IHero,
  ILeader,
  ICard,
  ICardHero,
  ICardLeader,
} from '../../pages/game/types/types';
import { Character } from '../Cards';

export const makeCardFromCharacter = (Character: Character): ICard => ({
  hero: heroToCard(new Character.Hero()),
  leader: leaderToCard(new Character.Leader()),
});

const heroToCard = (hero: IHero): ICardHero => {
  const { type, health, attack } = hero;

  return {
    type,
    health,
    attack,
    powers: {
      vanguard: {
        description: hero.vanguardDescription,
        effect: hero.vanguardPower(),
      },
      flank: {
        description: hero.flankDescription,
        effect: hero.flankPower(),
      },
      rear: {
        description: hero.rearDescription,
        effect: hero.rearPower(),
      },
      order: {
        description: hero.orderDescription,
        effect: hero.order(),
      },
    },
  };
};

const leaderToCard = (leader: ILeader): ICardLeader => {
  const { name, attack, health, attackType } = leader;

  return {
    name,
    attack,
    health,
    attackType,
    power: {
      description: leader.powerDescription,
      effect: leader.power(),
    },
  };
};
