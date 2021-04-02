import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../store/store';
import LeaderSelectionFromCards from './LeaderSelectionFromCards';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
      },
    }),
  {
    name: 'LeaderSelectionModal',
  },
);

export interface ILeaderSelectionModalProps {}

const LeaderSelectionModal: React.FC<ILeaderSelectionModalProps> = ({}) => {
  const classes = useStyles();
  const { game } = useSelector((state: RootStateType) => state);
  let open = false;

  if (!game) {
    return <></>;
  }

  const { playerColor } = game;

  if (game.hand.cards.length && !game.board[playerColor].leader) {
    open = true;
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <LeaderSelectionFromCards />
      </Backdrop>
    </>
  );
};

export default LeaderSelectionModal;
