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
}, { name: 'Home' });

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Board></Board>
      <PlayerHand></PlayerHand>
    </Container>
  );
};

export default HomePage;
