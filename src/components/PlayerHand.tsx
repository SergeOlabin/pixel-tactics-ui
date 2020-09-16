import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import HeroCard, { MagnifiedContext } from './HeroCard';
import { cardDimensions } from '../common/Constants';
import { CharacterList } from '../common/Types';
import { SetActiveCardAction } from '../store/actions/ActiveCardActions';

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    gridTemplateColumns: `repeat(1, ${cardDimensions.width}px)`,
    gridTemplateRows: `repeat(auto, ${cardDimensions.height}px)`,
    gap: `${theme.spacing(2)}px`,
    padding: theme.spacing(2),
    height: 150,
  },
  card: {
    width: cardDimensions.width,
    height: cardDimensions.height,
    transition: 'width 0.5s, height 0.2s',
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
  magnified: {
    width: cardDimensions.width * cardDimensions.magnifyMultipliers.width,
    height: cardDimensions.height * cardDimensions.magnifyMultipliers.height,
  },
}), { name: 'PlayerHand' });

export interface IPlayerHandProps {

}

const PlayerHand: React.FC<IPlayerHandProps> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const hand = useSelector((state: IAppState) => state.gameState.hand);
  const activeCard = useSelector((state: IAppState) => state.activeCard);

  const [magnifiedCardType, setMagnifier] = useState<CharacterList | null>(null);

  if (!hand) return <></>;

  const onMouseEnter = (type: CharacterList) => setMagnifier(type);
  const onMouseLeave = () => setMagnifier(null);

  const onCardClick = (event: React.MouseEvent, cardType: CharacterList) => {
    event.stopPropagation();

    const isActive = activeCard?.location === 'hand'
      && activeCard.card.type === cardType;

    const payload = isActive ? null : {
      card: { type: cardType },
      location: 'hand',
    };
    dispatch(SetActiveCardAction(payload));
  };

  const cards = hand.map(type =>
    <div
      key={type}
      className={[
        classes.card,
        magnifiedCardType === type ? classes.magnified : '',
        activeCard?.location === 'hand' && activeCard?.card.type === type
          ? classes.activeCard : '',
      ].join(' ')}
      onMouseEnter={() => onMouseEnter(type)}
      onMouseLeave={() => onMouseLeave()}
      onClick={(event) => onCardClick(event, type)}
    >
      <MagnifiedContext.Provider value={magnifiedCardType === type}>
        <HeroCard card={{ type }} />
      </MagnifiedContext.Provider>
    </div>,
  );

  return (
    <div className={classes.root}>{cards}</div>
  );
};

export default PlayerHand;
