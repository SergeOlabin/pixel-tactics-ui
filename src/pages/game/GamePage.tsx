import { Container, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setActiveCard } from '../../store/slices/active-card-slice';
import { RootStateType } from '../../store/store';
import Board from './components/Board';
import PlayerHand from './components/PlayerHand';
import { fetchExistingGame } from './store/game-thunks';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
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
        height: 120,
        paddingBottom: theme.spacing(1),
        // position: 'absolute',
        // bottom: 0,
        zIndex: 10,
      },
    }),
  { name: 'Home' },
);

const GamePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector((state: RootStateType) => state);
  const { game } = useSelector((state: RootStateType) => state);

  console.log('GamePage userInfo', userInfo);
  console.log('GamePage game', game);

  // skip render if userInfo is not yet loaded
  if (!userInfo) {
    return <></>;
  }

  if (!game) {
    dispatch(fetchExistingGame());
  }

  const resetActiveCard = () => {
    console.log('CARD RESET ON ROOT CLICK');

    dispatch(setActiveCard(null));
  };

  return (
    <Container className={classes.root} onClick={resetActiveCard}>
      <div className={classes.boardContainer}>{game && <Board />}</div>
      <div className={classes.playerHandContainer}>
        <PlayerHand />
      </div>
    </Container>
  );
};

export default GamePage;
