import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { CARD_DIMENSIONS, ICardDimensions } from '../common/Constants';
import { Players, Positions, Waves } from '../common/Types';
import BoardCard from './BoardCard';
import LeaderCard from './LeaderCard';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (cardDimensions: ICardDimensions) => ({
      display: 'grid',
      gridTemplateColumns: `repeat(3, ${cardDimensions.width}px)`,
      gridTemplateRows: `repeat(3, ${cardDimensions.height}px)`,
      gap: `${theme.spacing(2)}px`,
    }),
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
 { name: 'Unit' });

export interface IUnitProps {
  player: Players,
  mirrored?: boolean,
}

const getUnitMap = () => [
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

const Unit: React.FC<IUnitProps> = (props) => {
  const classes = useStyles(CARD_DIMENSIONS);

  // const playerUnit = useSelector((state: IAppState) => state.gameState.board[props.player]);

  const unitMap = getUnitMap();
  if (props.mirrored) {
    unitMap.map(wave => wave.reverse());
    unitMap.reverse();
  }

  const cards = unitMap.map(waves =>
    waves.map(place => !!place && <BoardCard place={place} key={getKey(place)} />));

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

