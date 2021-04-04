import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRANSITION_TIMEOUT } from '../../../shared/constants/CardGeometry';
import { setActiveCard } from '../../../store/slices/active-card-slice';
import { ActiveCardLocation } from '../../../store/types';
import { IAppState, RootStateType } from '../../../store/store';
import { PlayerContext } from './Board';
import { EmptyCardTemplate } from './CardTemplate';
import HeroCard, { IHeroCardProps } from './HeroCard';
import WithPopperPreview from './WithPopperPreview';
import { IPlace } from '../types/game-types';
import { useCanIGo } from '../hooks/use-can-i-go';
import { socket } from '../../../shared/service/socket';
import { GameEvent, IGameEvent } from '../types/game-socket-events';
import { GameEventTypes, IPlayCardPayload } from '../types/game-event-types';

export interface IBoardCardProps {
  place: IPlace;
  children?: React.ReactNode;
}

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      cardContainer: {
        transition: `box-shadow ${TRANSITION_TIMEOUT}ms`,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: theme.palette.cardShadows?.hover,
        },
      },
      activeCard: {
        boxShadow: theme.palette.cardShadows?.active,
        '&:hover': {
          boxShadow: theme.palette.cardShadows?.active,
        },
      },
    }),
  { name: 'BoardCard' },
);

const BoardCard: React.FC<IBoardCardProps> = ({ place, children }) => {
  const dispatch = useDispatch();
  const owner = useContext(PlayerContext);

  const userId = useSelector((state: RootStateType) => state.userInfo?._id);
  const activeCard = useSelector((state: RootStateType) => state.activeCard);
  const { game } = useSelector((state: RootStateType) => state);

  const { canIGoMyCells } = useCanIGo();

  const card = useSelector(
    (state: RootStateType) =>
      state.game?.board[owner].unit[place.wave][place.position],
  );

  const onCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!canIGoMyCells) return;

    if (activeCard) {
      if (activeCard.location === ActiveCardLocation.Hand) {
        if (!card) {
          console.log('CLICK with card in hand on EMPTY');

          const payload: IPlayCardPayload = {
            userId: userId!,
            cardType: activeCard.card.type,
            toPlace: place,
          };

          const event: IGameEvent = {
            gameId: game?._id!,
            payload,
            type: GameEventTypes.PlayCard,
          };

          socket.emit(GameEvent.ToServer, event);
        }
      }
    }

    // toggleCardSelection();
  };

  // const toggleCardSelection = () => {
  //   if (card) {
  //     const payload = isActive
  //       ? null
  //       : {
  //           card,
  //           place,
  //           location: ActiveCardLocation.Board,
  //         };
  //     dispatch(setActiveCard(payload));
  //   }
  // };

  const classes = useStyles();

  return (
    <>
      <div
        className={[
          classes.cardContainer,
          // isActive ? classes.activeCard : '',
        ].join(' ')}
        style={{ width: '100%', height: '100%' }}
        onClick={onCardClick}
      >
        {children || <EmptyCardTemplate />}
      </div>
    </>
  );
};

export default React.memo(BoardCard);
