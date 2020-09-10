import { makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { cards } from '../common/Characters';
import { Positions, Waves } from '../common/Types';
import { IAppState } from '../store/store';
import { PlayerContext } from './Board';
import BoardCard, { EmptyBoardCard } from './BoardCard';
import PowerDescription from './card-parts/PowerDescription';
import CardHeader from './card-parts/CardHeader';

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
  place: Place,
}

const HeroCard: React.FC<IHeroCardProps> = (props) => {
  const classes = useStyles();
  const player = useContext(PlayerContext);
  const { place } = props;

  const card = useSelector((state: IAppState) =>
    state.gameState.board[player][place.wave][place.position]);

  if (!card) return <EmptyBoardCard></EmptyBoardCard>;

  const cardData = cards[card.type].hero;
  const stats = {
    attack: cardData.attack,
    health: cardData.health,
  };

  const onMouseEnter = () => console.log('mouseEnter');
  const onMouseLeave = () => console.log('mouseLeave');

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <BoardCard>
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
      </BoardCard>
    </div>

  );
};

export default HeroCard;
