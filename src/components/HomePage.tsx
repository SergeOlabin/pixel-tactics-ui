import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Board from './Board';
import PlayerHand from './PlayerHand';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  boardContainer: {
    zIndex: 0,
    flexGrow: 1,
  },
  playerHandContainer: {
    // height: 150,
    // position: 'absolute',
    // bottom: 0,
    zIndex: 10,
  },
}, { name: 'Home' });

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.boardContainer}>
        <Board />
      </div>
      <div className={classes.playerHandContainer}>
        <PlayerHand />
      </div>
    </Container>
  );
};

export default HomePage;
