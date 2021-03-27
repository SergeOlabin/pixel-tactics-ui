import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../../store/store';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'ButtonWithGameIdWorkaround',
});

export interface IButtonWithGameIdWorkaroundProps {
  declineChallenge: (gameId: string) => any;
}

const ButtonWithGameIdWorkaround: React.FC<IButtonWithGameIdWorkaroundProps> = ({
  declineChallenge,
}) => {
  const classes = useStyles();
  const gameId = useSelector((state: RootStateType) => state.gameInit?.gameId);
  return (
    <>
      <Button
        autoFocus
        color='primary'
        onClick={() => declineChallenge(gameId!)}
      >
        Cancel
      </Button>
    </>
  );
};

export default ButtonWithGameIdWorkaround;
