import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import HeroCard, { MagnifiedContext } from './HeroCard';
import { cardDimensions } from '../common/Constants';
import { CharacterList } from '../common/Types';

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    gridTemplateColumns: `repeat(1, ${cardDimensions.width}px)`,
    gridTemplateRows: `repeat(auto, ${cardDimensions.height}px)`,
    gap: `${theme.spacing(1)}px`,
    padding: theme.spacing(2),
    height: 150,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: cardDimensions.width,
    height: cardDimensions.height,
    transition: 'width 0.5s, height 0.2s',
    // width: cardDimensions.width * 1.8,
    // height: cardDimensions.height * 1.8,

  },
  magnified: {
    width: cardDimensions.width * cardDimensions.magnifyMultipliers.width,
    height: cardDimensions.height * cardDimensions.magnifyMultipliers.height,
  },
}), { name: 'PlayerHand' });

export interface IPlayerHandProps {

}

const PlayerHand: React.FC<IPlayerHandProps> = (props) => {
  const classes = useStyles();
  const hand = useSelector((state: IAppState) => state.gameState.hand);
  const [magnifiedCardType, setMagnifier] = useState<CharacterList | null>(null);


  if (!hand) return <></>;

  const onMouseEnter = (type: CharacterList) => {

    setMagnifier(type);
  };
  const onMouseLeave = () => setMagnifier(null);

  const classNames = [
    classes.card,
  ].join(' ');

  const cards = hand.map(type =>
    <div key={type} className={[
      classes.card,
      magnifiedCardType === type
        ? classes.magnified
        : '',
      // classes.magnified,
    ].join(' ')}>
      <div
        className={classes.cardContainer}
        onMouseEnter={() => onMouseEnter(type)}
        onMouseLeave={() => onMouseLeave()}
      >
        <MagnifiedContext.Provider value={magnifiedCardType === type}>
          <HeroCard card={{ type }} />
        </MagnifiedContext.Provider>
      </div>
    </div>,
  );

  return (
    <div className={classes.root}>{cards}</div>
  );
};

export default PlayerHand;
