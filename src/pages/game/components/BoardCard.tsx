import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRANSITION_TIMEOUT } from '../../../shared/constants/CardGeometry';
import { IPlace } from '../../../shared/Types';
import { SetActiveCardAction } from '../../../store/actions/ActiveCardActions';
import { IAppState } from '../../../store/store';
import { PlayerContext } from './Board';
import { EmptyCardTemplate } from './CardTemplate';
import HeroCard, { IHeroCardProps } from './HeroCard';
import WithPopperPreview from './WithPopperPreview';

export interface IBoardCardProps {
  place: IPlace,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}), { name: 'BoardCard' });

const BoardCard: React.FC<IBoardCardProps> = (props) => {
  const { place } = props;
  const dispatch = useDispatch();

  const ownerPlayer = useContext(PlayerContext);
  const currentPlayer = useSelector((state: IAppState) => state.gameState.activePlayer);

  const activeCard = useSelector((state: IAppState) => state.activeCard);
  const card = useSelector((state: IAppState) =>
    state.gameState.board[ownerPlayer][place.wave][place.position]);

  const isActive = activeCard?.place === place;

  const onCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!activeCard && ownerPlayer !== currentPlayer) {
      console.log('NOT OWNER');
      return;
    }

    toggleCardSelection();
  };

  const toggleCardSelection = () => {
    const payload = isActive ? null : {
      card,
      place,
      location: 'board',
    };
    dispatch(SetActiveCardAction(payload));
  };

  const classes = useStyles();

  if (!card) return <EmptyCardTemplate></EmptyCardTemplate>;

  return (
    <>
      <div
        className={[
          classes.cardContainer,
          isActive ? classes.activeCard : '',
        ].join(' ')}
        style={{ width: '100%', height: '100%' }}
        onClick={onCardClick}
      >
        <HeroCardWithPopperPreview card={card} activeDescriptionWave={props.place.wave} />
      </div>
    </>
  );
};

const HeroCardWithPopperPreview = WithPopperPreview<IHeroCardProps>(HeroCard,
  { activeDescriptionWave: undefined },
);

export default BoardCard;