import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import { cards } from '../common/Characters';

const useStyles = makeStyles({
  root: {
    width: 150,
    height: 180,
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
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
    margin: '4px 3px',
    flexGrow: 1,
    width: 140,
    fontSize: '10px',
    lineHeight: 1.1,
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
  const card = useSelector((state: IAppState) => state.gameState.board.Red.Vanguard.Center);
  const classes = useStyles();

  if (!card) return <div>EMPTY</div>;

  const cardData = cards[card?.type].hero;


  return (
    <section className={classes.root}>
      <header className={classes.header}>
        <span>{cardData.type}</span>
        <span>Attack: {cardData.attack}</span>
        <span>Health: {cardData.health}</span>
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
