import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { GameConnectionContext } from '../../../providers/GameConnection';
import ConfirmationDialog from './ConfigrmationDialog';

const useStyles = makeStyles(theme => createStyles({

}), { name: 'ChallengeUserDialog' });

export interface IChallengeUserDialogProps {

}

const DEFAULT_TITLE_PART = 'challenged you to a game.';

const ChallengeUserDialog: React.FC<IChallengeUserDialogProps> = () => {
  const classes = useStyles();
  const gameConnection = useContext(GameConnectionContext);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    console.log('init dialog');
    gameConnection?.onAskAccept((payload) => {
      // TODO: change to a username
      const userId = payload.from;

      setTitle(`${userId} ${DEFAULT_TITLE_PART}`);
      setIsOpen(true);
    });
  }, []);

  const onClose = () => {
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
