export enum Players {
    Red = 'Red',
    Blue = 'Blue'
}

export type playerType = Players.Blue | Players.Blue;

export interface IBoard {
    turn: playerType,
}




