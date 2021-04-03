import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../store/store';
import HeroCard, { MagnifiedContext } from '../../components/HeroCard';
import { CARD_DIMENSIONS } from '../../../../shared/constants/CardGeometry';
import { CharacterList } from '../../types/character-list';
import { socket } from '../../../../shared/service/socket';
import {
  GameEventTypes,
  ISelectLeaderPayload,
} from '../../types/game-event-types';
import { GameEvent, IGameEvent } from '../../types/game-socket-events';
import LeaderCard from '../../components/LeaderCard';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      rootContainer: {
        display: 'flex',
        alignItems: 'center',
        gridTemplateColumns: `repeat(1, ${CARD_DIMENSIONS.width}px)`,
        gridTemplateRows: `repeat(auto, ${CARD_DIMENSIONS.height}px)`,
        gap: `${theme.spacing(2)}px`,
        // padding: theme.spacing(2),
        height: '100%',
      },
      cardContainer: {
        width: CARD_DIMENSIONS.magnifyMultipliers.width * CARD_DIMENSIONS.width,
        height:
          CARD_DIMENSIONS.magnifyMultipliers.height * CARD_DIMENSIONS.height,
        transition: 'width 0.5s, height 0.2s',
        '&:hover': {
          boxShadow: theme.palette.cardShadows?.hover,
        },
      },
    }),
  {
    name: 'LeaderSelectionFromCards',
  },
);

export interface ILeaderSelectionFromCardsProps {}

const LeaderSelectionFromCards: React.FC<ILeaderSelectionFromCardsProps> = ({}) => {
  const classes = useStyles();
  const { cards } = useSelector((state: RootStateType) => state.game!.hand);
  const { _id } = useSelector((state: RootStateType) => state.game!);
  const { _id: userId } = useSelector(
    (state: RootStateType) => state.userInfo!,
  );

  const selectLeader = (type: CharacterList) => {
    console.log('select leader', type);

    socket.emit(GameEvent.ToServer, {
      type: GameEventTypes.SelectLeader,
      gameId: _id,
      payload: {
        userId,
        type,
      },
    } as IGameEvent);
  };

  return (
    <>
      <div className={classes.rootContainer}>
        {cards.map((type: CharacterList) => (
          <div
            className={classes.cardContainer}
            key={type}
            onClick={() => selectLeader(type)}
          >
            <MagnifiedContext.Provider value={true}>
              <LeaderCard card={{ type, leader: true }} />
            </MagnifiedContext.Provider>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeaderSelectionFromCards;
