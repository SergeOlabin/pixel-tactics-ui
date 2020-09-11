import { makeStyles, createStyles, Divider } from '@material-ui/core';
import React from 'react';
import Unit from './Unit';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import { Players } from '../common/Types';

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
  boardsContainer: {
    width: '60%',
  },
  divider: {
    margin: theme.spacing(1),
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
        <PlayerContext.Provider value={opponent} >
          <Unit player={opponent} mirrored></Unit>
        </PlayerContext.Provider>
        <Divider variant='middle' className={classes.divider}/>
        <PlayerContext.Provider value={activePlayer}>
          <Unit player={activePlayer}></Unit>
        </PlayerContext.Provider>
      </div>
    </div>


  );
};

export default Board;
