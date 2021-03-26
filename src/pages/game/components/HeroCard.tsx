import { makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import React from 'react';
import { CARDS } from '../../../shared/Characters';
import { IBoardCard, Waves } from '../../../shared/types/types';
import CardHeader from './card-parts/CardHeader';
import PowerDescription from './card-parts/PowerDescription';
import CardTemplate from './CardTemplate';

const useStyles = makeStyles(
  {
    [Waves.Vanguard]: {
      backgroundColor: '#f9dbdb',
      borderColor: '#a31a1e',
    },
    [Waves.Flank]: {
      backgroundColor: '#c7e2b4',
      borderColor: '#374e32',
    },
    [Waves.Rear]: {
      backgroundColor: '#b3dcf4',
      borderColor: '#00464d',
    },
    order: {
      backgroundColor: deepPurple[100],
      borderColor: '#71206c',
    },
  },
  { name: 'HeroCard' },
);

export interface IHeroCardProps {
  card: IBoardCard;
  activeDescriptionWave?: Waves;
}

export const MagnifiedContext = React.createContext<boolean>(false);

const HeroCard: React.FC<IHeroCardProps> = ({
  card,
  activeDescriptionWave,
}) => {
  const classes = useStyles();
  const cardData = CARDS[card.type].hero;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  const description = activeDescriptionWave ? (
    <PowerDescription additionalClasses={[classes[activeDescriptionWave]]}>
      {
        cardData.powers[activeDescriptionWave.toString().toLowerCase()]
          ?.description
      }
    </PowerDescription>
  ) : (
    <React.Fragment>
      <PowerDescription additionalClasses={[classes.Vanguard]}>
        {cardData.powers.vanguard.description}
      </PowerDescription>
      <PowerDescription additionalClasses={[classes.Flank]}>
        {cardData.powers.flank.description}
      </PowerDescription>
      <PowerDescription additionalClasses={[classes.Rear]}>
        {cardData.powers.rear.description}
      </PowerDescription>
      <PowerDescription additionalClasses={[classes.order]}>
        {cardData.powers.order.description}
      </PowerDescription>
    </React.Fragment>
  );

  return (
    <>
      <CardTemplate singleDescription={!!activeDescriptionWave}>
        {{
          header: <CardHeader stats={stats} name={cardData.type}></CardHeader>,
          content: description,
        }}
      </CardTemplate>
    </>
  );
};

HeroCard.displayName = 'HeroCard';

export default HeroCard;
