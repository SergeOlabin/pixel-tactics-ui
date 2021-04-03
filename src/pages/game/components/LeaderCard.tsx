import { createStyles, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CARDS } from '../../../shared/Cards';
import { IBoardCard } from '../types/types';
import { setActiveCard } from '../../../store/slices/active-card-slice';
import { ActiveCardLocation } from '../../../store/types';
import { IAppState } from '../../../store/store';
import { PlayerContext } from './Board';
import CardHeader from './card-parts/CardHeader';
import PowerDescription from './card-parts/PowerDescription';
import CardTemplate, { EmptyCardTemplate } from './CardTemplate';
import WithPopperPreview from './WithPopperPreview';

export interface ILeaderCardProps {
  card?: IBoardCard;
}

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      card: {
        width: '100%',
        height: '100%',
        // '&:hover': {
        //   boxShadow: theme.palette.cardShadows?.hover,
        // },
      },
    }),
  { name: 'LeaderCard' },
);

const LeaderCard: React.FC<ILeaderCardProps> = ({ card }) => {
  const classes = useStyles();

  if (!card) return <EmptyCardTemplate />;

  const cardData = CARDS[card.type].leader;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  return (
    <>
      <div className={[classes.card].join(' ')}>
        <CardTemplate singleDescription>
          {{
            header: <CardHeader stats={stats} name={cardData.name} />,
            content: (
              <PowerDescription>{cardData.power.description}</PowerDescription>
            ),
          }}
        </CardTemplate>
      </div>
    </>
  );
};

LeaderCard.displayName = 'LeaderCard';

export const LeaderCardWithPopperPreview = React.memo(
  WithPopperPreview<ILeaderCardProps>(LeaderCard),
);

export default React.memo(LeaderCard);
