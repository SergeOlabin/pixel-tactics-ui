
export interface ICardDimensions {
  width: number,
  height: number,

  magnifyMultipliers: {
    width: number,
    height: number,
  },
}

export const cardDimensions: ICardDimensions = {
  width: 100,
  height: 120,

  magnifyMultipliers: {
    height: 1.8,
    width: 1.6,
  },
};
