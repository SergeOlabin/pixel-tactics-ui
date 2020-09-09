import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { cards } from '../common/Characters';
import { IAppState } from '../store/store';
import HeaderIcon from './card-parts/HeaderIcon';

const useStyles = makeStyles({
  root: {
    width: 150,
    backgroundColor: '#e4e8f1',
    borderRadius: '4px',
    border: '3px solid #171818',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 5px',
  },
  stats: {
    fontSize: '19px',
    fontWeight: 600,
    color: '#ee3433',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  descriptionBlock: {
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '2px',
    margin: '2px 3px',
    flexGrow: 0,
    width: 140,
    fontSize: 8,
    lineHeight: 1.1,
    textAlign: 'left',
    padding: 2,
    height: 30,
    display: 'flex',
    alignItems: 'center',
  },
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

interface IHeroCardProps {
  type: string,
}

const HeroCard: React.FC<IHeroCardProps> = () => {
  const classes = useStyles();
  const attackIcon = 'https://img.icons8.com/wired/24/000000/sword.png';
  const shieldIcon = 'https://img.icons8.com/dotty/24/000000/shield.png';

  const card = useSelector((state: IAppState) => state.gameState.board.Red.Vanguard.Center);

  if (!card) return <div>EMPTY</div>;

  const cardData = cards[card?.type].hero;

  return (
    <section className={classes.root}>
      <header className={classes.header}>
        <span>{cardData.type}</span>
        <HeaderIcon src={attackIcon}>
          <span className={classes.stats}>{cardData.attack}</span>
        </HeaderIcon>
        <HeaderIcon src={shieldIcon}>
          <span className={classes.stats}>{cardData.health}</span>
        </HeaderIcon>
      </header>
      <div className={classes.content}>
        <section className={`${classes.descriptionBlock} ${classes.vanguard}`}>
          {cardData.powers.vanguard.description}
        </section>
        <section className={`${classes.descriptionBlock} ${classes.flank}`}>
          {cardData.powers.flank.description}
        </section>
        <section className={`${classes.descriptionBlock} ${classes.rear}`}>
          {cardData.powers.rear.description}
        </section>
        <section className={`${classes.descriptionBlock} ${classes.order}`}>
          {cardData.powers.order.description}
        </section>
      </div>
    </section>
  );
};

export default HeroCard;
