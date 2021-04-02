import React from 'react';
import { makeStyles, createStyles, Button } from '@material-ui/core';
import InfoDialog, { SimpleDialogProps } from './InfoDialog';
import { socket } from '../../../../../../shared/service/socket';
import { dropGame } from '../../store/game-init.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../../../../../store/store';
import {
  GameInitEventsToClient,
  IDeclineGamePayload,
} from '../../../../../game/types/game-socket-events';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'OnChallengeCancelDialog',
});

const initDialogState: SimpleDialogProps = {
  open: false,
  title: '',
  onClose: () => {},
};

export interface IOnChallengeCancelDialogProps {}

const OnChallengeCancelDialog: React.FC<IOnChallengeCancelDialogProps> = ({}) => {
  const classes = useStyles();
  const [dialogState, setDialogState] = React.useState<SimpleDialogProps>(
    initDialogState,
  );
  const { userInfo } = useSelector((state: RootStateType) => state);
  const { friends } = useSelector((state: RootStateType) => state.friendsInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    socket.on(
      GameInitEventsToClient.GameDeclined,
      (payload: IDeclineGamePayload) => {
        dispatch(dropGame());
        const username =
          payload.from === userInfo?._id
            ? 'You'
            : friends.find((friend) => friend._id === payload.from)?.username;
        openUserCancelledDialog(username);
      },
    );
  }, [userInfo, friends]);

  const openUserCancelledDialog = (username: string | undefined) => {
    setDialogState({
      open: true,
      title: `${username} cancelled challenge`,
      actions: (
        <Button autoFocus onClick={closeDialog} color='primary'>
          Ok
        </Button>
      ),
      onClose: closeDialog,
    });
  };

  const closeDialog = () => {
    setDialogState((state) => ({
      ...state,
      open: false,
    }));
  };

  return (
    <>
      <InfoDialog {...dialogState} />
    </>
  );
};

export default OnChallengeCancelDialog;
