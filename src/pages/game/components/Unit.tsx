import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  ICardDimensions,
  CARD_DIMENSIONS,
} from '../../../shared/constants/CardGeometry';
import { RootStateType } from '../../../store/store';
import { Players, Waves, Positions, IPlace } from '../types/game-types';
import { PlayerContext } from './Board';
import BoardCard from './BoardCard';
import { HeroCardWithPopperPreview } from './HeroCard';
// import BoardCard from './BoardCard';
import { LeaderCardWithPopperPreview } from './LeaderCard';

const useStyles = makeStyles(
  (theme: Theme) =>
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
  { name: 'Unit' },
);

export interface IUnitProps {
  mirrored?: boolean;
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

const Unit: React.FC<IUnitProps> = ({ mirrored }) => {
  const classes = useStyles(CARD_DIMENSIONS);
  const owner = useContext(PlayerContext);

  const playerUnit = useSelector(
    (state: RootStateType) => state.game!.board[owner].unit,
  );
  const leader = useSelector(
    (state: RootStateType) => state.game?.board[owner].leader,
  );

  const unitMap = getUnitMap();
  if (mirrored) {
    unitMap.forEach((wave) => wave.reverse());
    unitMap.reverse();
  }

  const getCardForPlace = React.useCallback(
    (place: IPlace) => {
      return playerUnit[place.wave][place.position];
    },
    [playerUnit],
  );

  const cards = unitMap.map((waves) =>
    waves.map(
      (place) =>
        place && (
          <BoardCard place={place} key={getKey(place)}>
            {getCardForPlace(place) && (
              <HeroCardWithPopperPreview
                card={getCardForPlace(place)}
                activeDescriptionWave={place.wave}
              />
            )}
          </BoardCard>
        ),
    ),
  );

  // setLeader
  cards[1][1] = (
    <BoardCard
      place={{
        position: Positions.Center,
        wave: Waves.Flank,
      }}
      key='leader'
    >
      {leader?.type && (
        <LeaderCardWithPopperPreview card={{ type: leader?.type }} />
      )}
    </BoardCard>
  );

  return <div className={classes.root}>{[...cards]}</div>;
};

const getKey = (place: { wave: Waves; position: Positions }) =>
  `${place.wave}-${place.position}`;

export default Unit;
