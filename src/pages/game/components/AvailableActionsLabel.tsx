import React, { useContext } from 'react';
import { makeStyles, createStyles, Chip } from '@material-ui/core';
import { RootStateType } from '../../../store/store';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'AvailableActionsLabel',
});

export interface IAvailableActionsLabelProps {}

const AvailableActionsLabel: React.FC<IAvailableActionsLabelProps> = ({}) => {
  const owner = useContext(PlayerContext);
  const actions = useSelector(
    (state: RootStateType) => state.game?.players[owner].actionsMeta,
  );

  const classes = useStyles();

  if (!actions) return <></>;

  return (
    <>
      <Chip label={`${actions.available}/${actions.max}`} color='primary' />
    </>
  );
};

export default React.memo(AvailableActionsLabel);
