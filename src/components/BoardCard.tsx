import React, { useContext, useRef, useState } from 'react';
import { Waves, Positions } from '../common/Types';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import HeroCard from './HeroCard';
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

const useStyles = makeStyles(theme => createStyles({
  popperContainer: {
    marginLeft: theme.spacing(2),
    width: cardDimensions.width * 1.6,
    height: cardDimensions.width * 1.8,
    boxShadow: '0 0 20px 5px #00000099',
  },
}), { name: 'BoardCard' });


const BoardCard: React.FC<IBoardCardProps> = (props) => {
  const { place } = props;
  const player = useContext(PlayerContext);
  const card = useSelector((state: IAppState) =>
    state.gameState.board[player][place.wave][place.position]);
  const classes = useStyles();

  const [popperOpen, setPopperOpen] = useState(false);

  const handlePopoverOpen = () => setPopperOpen(true);
  const handlePopoverClose = () => setPopperOpen(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  if (!card) return <EmptyCardTemplate></EmptyCardTemplate>;

  return (
    <>
      <div
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
            anchorEl={anchorRef.current}
            open={popperOpen}
            placement='right'
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <div className={classes.popperContainer}>
                  <HeroCard card={card} />
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
