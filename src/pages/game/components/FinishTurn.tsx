import React from 'react';
import { makeStyles, createStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/store';
import { green, grey } from '@material-ui/core/colors';

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
  const user = useSelector((state: RootStateType) => state.userInfo?.username);
  const { playerColor, turn } =
    useSelector((state: RootStateType) => state.game) || {};
  const { currentPlayer } = turn!;

  const buttonActive = playerColor && turn && playerColor === currentPlayer;
  const buttonColor = buttonActive ? green : grey;
  const buttonTitle = buttonActive ? 'End Turn' : 'Waiting...';

  const classes = useStyles({ color: buttonColor });

  return (
    <div>
      <Fab
        className={classes.fab}
        color='inherit'
        size='large'
        variant='extended'
        disabled={!buttonActive}
      >
        {buttonTitle}
      </Fab>
    </div>
  );
};

export default FinishTurnButton;
