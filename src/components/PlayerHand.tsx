import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import HeroCard from './HeroCard';
import { cardDimensions } from '../common/Constants';

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    height: 200,
    gridTemplateColumns: `repeat(1, ${cardDimensions.width}px)`,
    gridTemplateRows: `repeat(auto, ${cardDimensions.height}px)`,
    gap: `${theme.spacing(1)}px`,
    padding: theme.spacing(2),
  },
  card: {
    width: cardDimensions.width,
    height: cardDimensions.height,
    overflow: 'hidden',
  },
}), { name: 'PlayerHand' });

export interface IPlayerHandProps {

}

const PlayerHand: React.FC<IPlayerHandProps> = (props) => {
  const classes = useStyles();
  const hand = useSelector((state: IAppState) => state.gameState.hand);
  if (!hand) return <></>;

  const cards = hand.map(type =>
    <div key={type} className={classes.card}><HeroCard card={{ type }}></HeroCard></div>,
  );

  return (
    <div className={classes.root}>{cards}</div>
  );
};

export default PlayerHand;
