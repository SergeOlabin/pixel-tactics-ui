export interface ICardDimensions {
  width: number,
  height: number,

  magnifyMultipliers: {
    width: number,
    height: number,
  },
}

export const CARD_DIMENSIONS: ICardDimensions = {
  width: 100,
  height: 120,

  magnifyMultipliers: {
    height: 3,
    width: 2,
  },
};

export const TRANSITION_TIMEOUT = 350;
