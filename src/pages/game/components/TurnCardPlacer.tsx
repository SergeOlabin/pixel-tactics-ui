import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';
import {
  CARD_DIMENSIONS,
  ICardDimensions,
} from '../../../shared/constants/CardGeometry';
import { Waves, Players, TurnStage } from '../types/game-types';
import { IAppState } from '../../../store/store';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: (props: ICardDimensions) => ({
        display: 'grid',
        gridTemplateColumns: `repeat(1, ${props.width}px)`,
        gridTemplateRows: `repeat(3, ${props.height}px)`,
        gap: `${theme.spacing(1)}px`,
      }),
      cardSlot: (props: ICardDimensions) => ({
        width: props.width,
        height: props.height,
        marginBottom: theme.spacing(1),
        border: '2px dotted #171818',
      }),
      turnCard: {},
    }),
  { name: 'TurnCardPlacer' },
);

export interface ITurnCardPlacerProps {
  mirrored?: boolean;
}

const TurnCardPlacer: React.FC<ITurnCardPlacerProps> = (props) => {
  const classes = useStyles(CARD_DIMENSIONS);
  const slots = Object.values(Waves);
  if (props.mirrored) slots.reverse();

  const ownerPlayer = useContext(PlayerContext);
  const { turn } = useSelector((state: IAppState) => state.game!);

  const { wave: activeWave } = turn;
  const stage =
    turn.currentPlayer === ownerPlayer
      ? TurnStage.InProgress
      : TurnStage.Waiting;

  return (
    <div className={classes.root}>
      {slots.map((wave) => (
        <div key={wave} className={classes.cardSlot}>
          {wave === activeWave ? (
            <PlayerTurnCard player={ownerPlayer}>
              {turn.firstPlayer} is FIRST
              <div>{stage}</div>
            </PlayerTurnCard>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};

const PlayerTurnCard: React.FC<{ player: Players }> = ({
  player,
  children,
}) => (
  <div>
    {player} {children}
  </div>
);

export default TurnCardPlacer;
