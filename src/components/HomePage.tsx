import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DogCard from './DogCard';
import SimpleCard from './SimpleCard';
import HeroCard from './HeroCard';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <HeroCard type='HUI'></HeroCard>
      {/* <SimpleCard /> */}
      {/* <DogCard /> */}
    </Container>
  );
};

export default HomePage;
