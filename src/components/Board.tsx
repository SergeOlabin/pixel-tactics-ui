import { makeStyles } from '@material-ui/core';
import React from 'react';
import Unit from './Unit';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import { Players } from '../common/Types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.light,
  },
  boardsContainer: {
    width: '60%',
  },
  divider: {

  },
}));

export interface IBoardProps {

}

export const PlayerContext = React.createContext<Players>(Players.Blue); // 'Blue' for default, default can be removed

const Board: React.FC<IBoardProps> = () => {
  const classes = useStyles();
  const activePlayer = useSelector((state: IAppState) => state.gameState.activePlayer);

  return (
    <div className={classes.root}>
      <div className={classes.boardsContainer}>
        <PlayerContext.Provider value={activePlayer}>
          <Unit player={activePlayer}></Unit>
        </PlayerContext.Provider>

      </div>
    </div>


  );
};

export default Board;
