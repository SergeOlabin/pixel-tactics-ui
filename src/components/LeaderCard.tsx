import { createStyles, makeStyles } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cards } from '../common/Characters';
import { IBoardCard } from '../common/Types';
import { SetActiveCardAction } from '../store/actions/ActiveCardActions';
import { IAppState } from '../store/store';
import { PlayerContext } from './Board';
import CardHeader from './card-parts/CardHeader';
import PowerDescription from './card-parts/PowerDescription';
import CardTemplate, { EmptyCardTemplate } from './CardTemplate';
import WithPopperPreview from './WithPopperPreview';


export interface ILeaderCardProps {
  card?: IBoardCard,
}

const useStyles = makeStyles(theme => createStyles({
  card: {
    width: '100%',
    height: '100%',
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
}), { name: 'LeaderCard' });

const LeaderCard: React.FC<ILeaderCardProps> = () => {
  const dispatch = useDispatch();
  const ownerPlayer = useContext(PlayerContext);

  const currentPlayer = useSelector((state: IAppState) => state.gameState.activePlayer);
  const card = useSelector((state: IAppState) => state.gameState.leaders?.[ownerPlayer]);
  const activeCard = useSelector((state: IAppState) => state.activeCard);

  const classes = useStyles();

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
    </>
  );
};

export const LeaderCardWithPopperPreview = WithPopperPreview<ILeaderCardProps>(LeaderCard);

export default LeaderCard;
