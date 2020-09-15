import React, { useContext, useRef, useState } from 'react';
import { Waves, Positions } from '../common/Types';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import HeroCard, { MagnifiedContext } from './HeroCard';
import { EmptyCardTemplate } from './CardTemplate';
import Popper from '@material-ui/core/Popper';
import { makeStyles, createStyles, Fade } from '@material-ui/core';
import { cardDimensions } from '../common/Constants';

interface Place {
  wave: Waves,
  position: Positions,
}

export interface IBoardCardProps {
  place: Place,
}

const TRANSITION_TIMEOUT = 350;

const useStyles = makeStyles(theme => createStyles({
  cardContainer: {
    transition: `box-shadow ${TRANSITION_TIMEOUT}ms`,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 0 20px 10px #c0bdde',
    },
  },
  popperContainer: {
    marginLeft: theme.spacing(2),
    width: cardDimensions.width * cardDimensions.magnifyMultipliers.width,
    height: cardDimensions.width * cardDimensions.magnifyMultipliers.height,
    boxShadow: '0 0 40px 10px #00000099',
  },
}), { name: 'BoardCard' });

const BoardCard: React.FC<IBoardCardProps> = (props) => {
  const { place } = props;
  const player = useContext(PlayerContext);
  const card = useSelector((state: IAppState) =>
    state.gameState.board[player][place.wave][place.position]);
  const classes = useStyles();

  const [popperOpen, setPopperOpen] = useState(false);

  const handlePopoverOpen = () => {
    console.log('OPEN');
    setPopperOpen(true);
  };
  const handlePopoverClose = () => {
    console.log('CLOSE');
    setPopperOpen(false);
  };

  const anchorRef = useRef<HTMLDivElement>(null);

  if (!card) return <EmptyCardTemplate></EmptyCardTemplate>;

  return (
    <>
      <div
        className={classes.cardContainer}
        style={{ width: '100%', height: '100%' }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        ref={anchorRef}
      >
        <HeroCard card={card} activeDescriptionWave={props.place.wave} />
      </div>
      {
        (
          <Popper
            style={{ zIndex: 100 }}
            anchorEl={anchorRef.current}
            open={popperOpen}
            placement='right'
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={TRANSITION_TIMEOUT}>
                <div className={classes.popperContainer}>
                  <MagnifiedContext.Provider value={true}>
                    <HeroCard card={card} />
                  </MagnifiedContext.Provider>
                </div>
              </Fade>
            )}
          </Popper >
        )
      }
    </>
  );
};

export default BoardCard;
