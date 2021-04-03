import { Button, Container, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setActiveCard } from '../../store/slices/active-card-slice';
import { RootStateType } from '../../store/store';
import Board from './components/Board';
import PlayerHand from './components/PlayerHand';
import LeaderSelectionModal from './features/leader-selection/LeaderSelectionModal';
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
      placeholderContainer: {
        height: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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

  // skip render if userInfo is not yet loaded
  if (!userInfo) {
    return <></>;
  }

  if (!game) {
    dispatch(fetchExistingGame());
    return (
      <Container className={classes.placeholderContainer}>
        <Typography variant='h5'>No active game</Typography>
        <Button href='/menu' color='primary'>
          Back
        </Button>
      </Container>
    );
  }

  const resetActiveCard = () => {
    console.log('CARD RESET ON ROOT CLICK');

    dispatch(setActiveCard(null));
  };

  return (
    <>
      <Container className={classes.root} onClick={resetActiveCard}>
        <div className={classes.boardContainer}>{game && <Board />}</div>
        <div className={classes.playerHandContainer}>
          <PlayerHand />
        </div>
      </Container>
      <LeaderSelectionModal />
    </>
  );
};

export default GamePage;
