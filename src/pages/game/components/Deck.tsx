import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import {
  CARD_DIMENSIONS,
  ICardDimensions,
} from '../../../shared/constants/CardGeometry';
import { PlayerContext } from './Board';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/store';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      cardSlot: (props: ICardDimensions) => ({
        width: props.width,
        height: props.height,
        marginBottom: theme.spacing(1),
        border: '2px dotted #171818',
      }),
    }),
  { name: 'Deck' },
);

export interface IDeckProps {}

const Deck: React.FC<IDeckProps> = ({}) => {
  const classes = useStyles(CARD_DIMENSIONS);
  const player = useContext(PlayerContext);

  const { playerColor, turn } =
    useSelector((state: RootStateType) => state.game) || {};
  return (
    <>
      <div className={classes.cardSlot}>{player} DECK</div>
    </>
  );
};

export default Deck;
