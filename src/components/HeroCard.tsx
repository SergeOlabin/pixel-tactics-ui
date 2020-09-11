import { makeStyles } from '@material-ui/core';
import React from 'react';
import { cards } from '../common/Characters';
import { IBoardCard, Positions, Waves } from '../common/Types';
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
    backgroundColor: '#e4d5e8',
    borderColor: '#71206c',
  },
});

interface Place {
  wave: Waves,
  position: Positions,
}

interface IHeroCardProps {
  card: IBoardCard,
}

const HeroCard: React.FC<IHeroCardProps> = (props) => {
  const classes = useStyles();
  const cardData = cards[props.card.type].hero;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  // const onMouseEnter = () => console.log('mouseEnter');
  // const onMouseLeave = () => console.log('mouseLeave');

  return (
    <>
      <CardTemplate>
        {{
          header: <CardHeader stats={stats} name={cardData.type}></CardHeader>,
          content: (
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
          ),
        }}
      </CardTemplate>
    </>

  );
};

export default HeroCard;
