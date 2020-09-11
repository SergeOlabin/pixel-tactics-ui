import { makeStyles, createStyles, Divider, Button } from '@material-ui/core';
import React from 'react';
import Unit from './Unit';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import { Players } from '../common/Types';
import TurnCardPlacer from './TurnCardPlacer';
import FinishTurnButton from './FinishTurn';

const useStyles = makeStyles(theme => createStyles({
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}), { name: 'Board' });

export interface IBoardProps {

}

export const PlayerContext = React.createContext<Players>(Players.Blue); // 'Blue' for default, default can be removed

const Board: React.FC<IBoardProps> = () => {
  const classes = useStyles();
  const activePlayer = useSelector((state: IAppState) => state.gameState.activePlayer);

  const opponent = (Object.values(Players).find(v => v !== activePlayer)) as Players;

  return (
    <div className={classes.root}>
      <div className={classes.boardsContainer}>
        <div className={classes.playerGroup}>
          <PlayerContext.Provider value={opponent} >
            <Unit player={opponent} mirrored></Unit>
            <div className={classes.turnCardPlacer}><TurnCardPlacer mirrored></TurnCardPlacer></div>
          </PlayerContext.Provider>
        </div>
        <Divider variant='middle' className={classes.divider} />
        <div className={classes.playerGroup}>
          <PlayerContext.Provider value={activePlayer}>
            <Unit player={activePlayer}></Unit>
            <div className={classes.turnCardPlacer}><TurnCardPlacer></TurnCardPlacer></div>
          </PlayerContext.Provider>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <FinishTurnButton></FinishTurnButton>
      </div>
    </div>


  );
};

export default Board;
