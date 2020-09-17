import React, { useContext, useRef, useState } from 'react';
import { IBoardCard } from '../common/Types';
import { PlayerContext } from './Board';
import CardTemplate, { EmptyCardTemplate } from './CardTemplate';
import CardHeader from './card-parts/CardHeader';
import PowerDescription from './card-parts/PowerDescription';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import { cards } from '../common/Characters';

import { makeStyles, createStyles, Fade, Popper } from '@material-ui/core';
import { SetActiveCardAction } from '../store/actions/ActiveCardActions';
import { CARD_DIMENSIONS, TRANSITION_TIMEOUT } from '../common/Constants';
import HeroCard, { MagnifiedContext } from './HeroCard';

export interface ILeaderCardProps {
  card?: IBoardCard,
}

const useStyles = makeStyles(theme => createStyles({
  card: {
    '&:hover': {
      boxShadow: theme.palette.cardShadows?.hover,
    },
  },
  active: {
    boxShadow: theme.palette.cardShadows?.active,
    '&:hover': {
      boxShadow: theme.palette.cardShadows?.active,
    },
  },
  popperContainer: {
    marginLeft: theme.spacing(2),
    width: CARD_DIMENSIONS.width * CARD_DIMENSIONS.magnifyMultipliers.width,
    height: CARD_DIMENSIONS.width * CARD_DIMENSIONS.magnifyMultipliers.height,
    boxShadow: '0 0 40px 10px #00000099',
  },
}), { name: 'LeaderCard' });

const LeaderCard: React.FC<ILeaderCardProps> = () => {
  const dispatch = useDispatch();
  const ownerPlayer = useContext(PlayerContext);

  const currentPlayer = useSelector((state: IAppState) => state.gameState.activePlayer);
  const card = useSelector((state: IAppState) => state.gameState.leaders?.[ownerPlayer]);
  const activeCard = useSelector((state: IAppState) => state.activeCard);


  const [popperOpen, setPopperOpen] = useState(false);
  const handlePopoverOpen = () => setPopperOpen(true);
  const handlePopoverClose = () => setPopperOpen(false);

  const classes = useStyles();

  const anchorRef = useRef<HTMLDivElement>(null);

  if (!card) return <EmptyCardTemplate></EmptyCardTemplate>;

  const cardData = cards[card.type].leader;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };
  const isActive = activeCard?.location === 'leader' && ownerPlayer === currentPlayer;

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
      location: 'leader',
    };
    dispatch(SetActiveCardAction(payload));
  };

  return (
    <>
      <div className={[
        classes.card,
        isActive ? classes.active : '',
      ].join(' ')}
        onClick={onCardClick}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        ref={anchorRef}
      >
        <CardTemplate singleDescription>
          {{
            header: <CardHeader stats={stats} name={cardData.name}></CardHeader>,
            content: (<React.Fragment>
              <PowerDescription>
                {cardData.power.description}
              </PowerDescription>
            </React.Fragment>),
          }}
        </CardTemplate>
      </div>
      {(
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
      )}
    </>
  );
};

export default LeaderCard;
