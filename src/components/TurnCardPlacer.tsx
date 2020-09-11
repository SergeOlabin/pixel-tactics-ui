import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { Waves, Players } from '../common/Types';
import { cardDimensions, ICardDimensions } from '../common/Constants';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: `repeat(1, ${cardDimensions.width}px)`,
    gridTemplateRows: `repeat(3, ${cardDimensions.height}px)`,
    gap: `${theme.spacing(1)}px`,
  },
  cardSlot: (props: ICardDimensions) => ({
    width: props.width,
    height: props.height,
    marginBottom: theme.spacing(1),
    border: '2px dotted #171818',
  }),
  turnCard: {

  },

}), { name: 'TurnCardPlacer' });

export interface ITurnCardPlacerProps {
  mirrored?: boolean,
}

const TurnCardPlacer: React.FC<ITurnCardPlacerProps> = (props) => {
  const classes = useStyles(cardDimensions);
  const slots = Object.values(Waves);
  if (props.mirrored) slots.reverse();

  const player = useContext(PlayerContext);
  const turn = useSelector((state: IAppState) => state.gameState.turns[player]);
  console.log(turn);

  return (
    <div className={classes.root}>
      {slots.map(wave =>
        <div key={wave} className={classes.cardSlot}>
          {
            wave === turn.wave
              ? <PlayerTurnCard player={player}>{turn.stage}</PlayerTurnCard>
              : ''
          }
        </div>)
      }
    </div>
  );
};

const PlayerTurnCard: React.FC<{ player: Players }> =
  ({ player, children }) => <div>{player} {children}</div>;


export default TurnCardPlacer;
