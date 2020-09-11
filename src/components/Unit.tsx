import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Players, Positions, Waves } from '../common/Types';
import { IAppState } from '../store/store';
import HeroCard from './HeroCard';
import LeaderCard from './LeaderCard';

interface ICardDimensions {
  width: number,
  height: number,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (cardDimensions: ICardDimensions) => ({
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: `repeat(3, ${cardDimensions.width}px)`,
      gridTemplateRows: `repeat(3, ${cardDimensions.height}px)`,
      gap: `${theme.spacing(1)}px`,
    }),
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export interface IUnitProps {
  player: Players,
  mirrored?: boolean,
}

const Unit: React.FC<IUnitProps> = (props) => {
  const cardDimensions: ICardDimensions = {
    width: 100,
    height: 120,
  };
  const classes = useStyles(cardDimensions);

  // const playerUnit = useSelector((state: IAppState) => state.gameState.board[props.player]);
  const unitMap = [
    [
      { wave: Waves.Vanguard, position: Positions.Left },
      { wave: Waves.Vanguard, position: Positions.Center },
      { wave: Waves.Vanguard, position: Positions.Right },
    ],
    [
      { wave: Waves.Flank, position: Positions.Left },
      undefined,
      { wave: Waves.Flank, position: Positions.Right },
    ],
    [
      { wave: Waves.Rear, position: Positions.Left },
      { wave: Waves.Rear, position: Positions.Center },
      { wave: Waves.Rear, position: Positions.Right },
    ],
  ];

  if (props.mirrored) {
    unitMap.map(wave => wave.reverse());
    unitMap.reverse();
  }

  const cards = unitMap.map(waves =>
    waves.map(place => !!place && <HeroCard place={place} key={getKey(place)}></HeroCard>));

  // setLeader
  cards[1][1] = <LeaderCard key='leader'></LeaderCard>;

  return (
    <div className={classes.root}>
      {[...cards]}
    </div>
  );
};

const getKey = (place: {
  wave: Waves,
  position: Positions,
}) => `${place.wave}-${place.position}`;

export default Unit;

