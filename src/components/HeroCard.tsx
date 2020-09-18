import { makeStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import React from 'react';
import { cards } from '../common/Characters';
import { IBoardCard, Waves } from '../common/Types';
import CardHeader from './card-parts/CardHeader';
import PowerDescription from './card-parts/PowerDescription';
import CardTemplate from './CardTemplate';

const useStyles = makeStyles({
  vanguard: {
    backgroundColor: '#f9dbdb',
    borderColor: '#a31a1e',
  },
  flank: {
    backgroundColor: '#c7e2b4',
    borderColor: '#374e32',
  },
  rear: {
    backgroundColor: '#b3dcf4',
    borderColor: '#00464d',
  },
  order: {
    backgroundColor: deepPurple[100],
    borderColor: '#71206c',
  },
});

export interface IHeroCardProps {
  card: IBoardCard,
  activeDescriptionWave?: Waves,
}

export const MagnifiedContext = React.createContext<boolean>(false);

const HeroCard: React.FC<IHeroCardProps> = (props, ref) => {
  const classes = useStyles();
  const cardData = cards[props.card.type].hero;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  const description = props.activeDescriptionWave
    ? (<PowerDescription additionalClasses={[classes[props.activeDescriptionWave.toLowerCase()]]}>
      {cardData.powers[props.activeDescriptionWave.toLowerCase()].description}
    </PowerDescription>)
    : (
      <React.Fragment>
        <PowerDescription additionalClasses={[classes.vanguard]}>
          {cardData.powers.vanguard.description}
        </PowerDescription>
        <PowerDescription additionalClasses={[classes.flank]}>
          {cardData.powers.flank.description}
        </PowerDescription>
        <PowerDescription additionalClasses={[classes.rear]}>
          {cardData.powers.rear.description}
        </PowerDescription>
        <PowerDescription additionalClasses={[classes.order]}>
          {cardData.powers.order.description}
        </PowerDescription>
      </React.Fragment>
    );

  return (
    <>
      <CardTemplate
        singleDescription={!!props.activeDescriptionWave}
      >
        {{
          header: <CardHeader
            stats={stats}
            name={cardData.type}
          ></CardHeader>,
          content: (description),
        }}
      </CardTemplate>
    </>

  );
};

export default HeroCard;
