import { createStyles, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  CARD_DIMENSIONS,
  ICardDimensions,
  TRANSITION_TIMEOUT,
} from '../../../shared/constants/CardGeometry';
import { socket } from '../../../shared/service/socket';
import { RootStateType } from '../../../store/store';
import { GameEventTypes } from '../types/game-event-types';
import { GameEvent, IGameEvent } from '../types/game-socket-events';
import { PlayerContext } from './Board';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      cardSlot: (props: ICardDimensions) => ({
        width: props.width,
        cursor: 'pointer',
        height: props.height,
        marginBottom: theme.spacing(1),
        border: '2px dotted #171818',
        transition: `box-shadow ${TRANSITION_TIMEOUT}ms`,
        '&:hover': {
          boxShadow: theme.palette.cardShadows?.hover,
        },
      }),
      active: {
        boxShadow: theme.palette.cardShadows?.active,
        '&:hover': {
          boxShadow: theme.palette.cardShadows?.active,
        },
      },
    }),
  { name: 'Deck' },
);

export interface IDeckProps {}

const Deck: React.FC<IDeckProps> = ({}) => {
  const classes = useStyles(CARD_DIMENSIONS);
  const owner = useContext(PlayerContext);

  const { leader } = useSelector(
    (state: RootStateType) => state.game!.board[owner],
  );

  const { userInfo, game } = useSelector((state: RootStateType) => state);
  const { playerColor, turn } = game || {};

  const active = playerColor === turn?.currentPlayer && playerColor === owner;

  const leaderSelection = !leader && playerColor === owner;

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (leaderSelection) {
      const payload: IGameEvent = {
        gameId: game?._id!,
        type: GameEventTypes.DrawCardsForLeader,
        payload: {
          userId: userInfo?._id!,
        },
      };
      socket.emit(GameEvent.ToServer, payload);
      return;
    }

    if (!active) {
      return;
    }
    drawCard();
  };

  const drawCard = () => {
    const payload: IGameEvent = {
      gameId: game?._id!,
      type: GameEventTypes.DrawCard,
      payload: {
        userId: userInfo?._id!,
      },
    };
    socket.emit(GameEvent.ToServer, payload);
  };

  const cardClasses = [classes.cardSlot];
  if (leaderSelection) {
    cardClasses.push(classes.active);
  }
  return (
    <>
      <div className={cardClasses.join(' ')} onClick={onClick}>
        {owner} DECK
      </div>
    </>
  );
};

export default Deck;
