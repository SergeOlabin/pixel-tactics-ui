import { makeStyles, createStyles, Divider, Button } from '@material-ui/core';
import React from 'react';
import Unit from './Unit';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../store/store';
import TurnCardPlacer from './TurnCardPlacer';
import FinishTurnButton from './FinishTurn';
import { Players } from '../types/game-types';
import Deck from './Deck';
import AvailableActionsLabel from './AvailableActionsLabel';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        display: 'flex',
      },
      boardsContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      divider: {
        margin: theme.spacing(1),
        width: 350,
      },
      playerGroup: {
        display: 'flex',
        alignItems: 'center',
      },
      turnCardPlacer: {
        marginLeft: theme.spacing(10),
      },
      rightContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      deckContainer: {
        marginLeft: theme.spacing(10),
      },
      actionsInfo: {
        marginBottom: theme.spacing(1),
      },
    }),
  { name: 'Board' },
);

export interface IBoardProps {}

export const PlayerContext = React.createContext<Players>(Players.Blue); // 'Blue' for default, default can be removed

const Board: React.FC<IBoardProps> = () => {
  const classes = useStyles();
  const activePlayer = useSelector(
    (state: IAppState) => state.game!.playerColor,
  );

  const opponent = Object.values(Players).find(
    (v) => v !== activePlayer,
  ) as Players;

  return (
    <div className={classes.root}>
      <div className={classes.boardsContainer}>
        <div className={classes.playerGroup}>
          <PlayerContext.Provider value={opponent}>
            <Unit mirrored />
            <div className={classes.turnCardPlacer}>
              <TurnCardPlacer mirrored />
            </div>
            <div className={classes.deckContainer}>
              <div className={classes.actionsInfo}>
                <AvailableActionsLabel />
              </div>
              <Deck />
            </div>
          </PlayerContext.Provider>
        </div>
        <Divider variant='middle' className={classes.divider} />
        <div className={classes.playerGroup}>
          <PlayerContext.Provider value={activePlayer}>
            <Unit />
            <div className={classes.turnCardPlacer}>
              <TurnCardPlacer />
            </div>
            <div className={classes.deckContainer}>
              <div className={classes.actionsInfo}>
                <AvailableActionsLabel />
              </div>
              <Deck />
            </div>
          </PlayerContext.Provider>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <FinishTurnButton />
      </div>
    </div>
  );
};

export default Board;
