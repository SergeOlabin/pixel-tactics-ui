import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { GameConnectionContext } from '../../../providers/GameConnection';
import ConfirmationDialog from './ConfigrmationDialog';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../../store/store';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'ChallengeUserDialog',
});

export interface IChallengeUserDialogProps {}

const DEFAULT_TITLE_PART = 'challenged you to a game.';

const ChallengeUserDialog: React.FC<IChallengeUserDialogProps> = () => {
  const classes = useStyles();
  const gameConnection = useContext(GameConnectionContext);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const { activeFriend } = useSelector(
    (state: RootStateType) => state.friendsInfo,
  );

  useEffect(() => {
    console.log('init dialog');
    gameConnection?.onAskAccept((payload) => {
      setTitle(`${activeFriend?.username} ${DEFAULT_TITLE_PART}`);
      setIsOpen(true);
    });
  }, [activeFriend]);

  const onClose = () => {
    gameConnection?.declineGame();
    setIsOpen(false);
  };

  const onConfirm = () => {
    gameConnection?.acceptGame();
    setIsOpen(false);
  };

  return (
    <ConfirmationDialog
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      open={isOpen}
    />
  );
};

export default ChallengeUserDialog;
