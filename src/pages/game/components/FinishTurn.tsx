import { createStyles, Fab, makeStyles } from '@material-ui/core';
import { green, grey } from '@material-ui/core/colors';
import React from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../../shared/service/socket';
import { RootStateType } from '../../../store/store';
import { GameEventTypes } from '../types/game-event-types';
import { GameEvent, IGameEvent } from '../types/game-socket-events';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      fab: ({ color }: IStylesProps) => ({
        color: theme.palette.getContrastText(color[500]),
        backgroundColor: color[500],
        '&:hover': {
          backgroundColor: color[700],
        },
      }),
    }),
  { name: 'FinishTurnButton' },
);

export interface IStylesProps {
  color: Record<string, string>;
}

const FinishTurnButton: React.FC = () => {
  const userId = useSelector((state: RootStateType) => state.userInfo?._id);
  const { playerColor, turn, _id } =
    useSelector((state: RootStateType) => state.game) || {};
  const { currentPlayer } = turn!;

  const buttonActive = playerColor && turn && playerColor === currentPlayer;
  const buttonColor = buttonActive ? green : grey;
  const buttonTitle = buttonActive ? 'End Turn' : 'Waiting...';

  const classes = useStyles({ color: buttonColor });

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const event: IGameEvent = {
      type: GameEventTypes.NextTurn,
      gameId: _id!,
      payload: {
        userId: userId!,
      },
    };

    socket.emit(GameEvent.ToServer, event);
  };

  return (
    <div>
      <Fab
        className={classes.fab}
        color='inherit'
        size='large'
        variant='extended'
        disabled={!buttonActive}
        onClick={onClick}
      >
        {buttonTitle}
      </Fab>
    </div>
  );
};

export default FinishTurnButton;
