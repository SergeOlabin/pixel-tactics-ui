import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Players, Positions, Waves } from '../common/Types';
import { IAppState } from '../store/store';
import HeroCard from './HeroCard';
import LeaderCard from './LeaderCard';

interface ICardDimensions {
  width: number,
  height: number,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (cardDimensions: ICardDimensions) => ({
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: `repeat(3, ${cardDimensions.width}px)`,
      gridTemplateRows: `repeat(3, ${cardDimensions.height}px)`,
      gap: `${theme.spacing(1)}px`,
    }),
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export interface IUnitProps {
  player: Players,
  mirrored?: boolean,
}

const Unit: React.FC<IUnitProps> = (props) => {
  const cardDimensions: ICardDimensions = {
    width: 100,
    height: 120,
  };
  const classes = useStyles(cardDimensions);

  const playerBoard = useSelector((state: IAppState) => state.gameState.board[props.player]);

  return (
    <div className={classes.root}>
      <HeroCard place={{ wave: Waves.Vanguard, position: Positions.Left }}></HeroCard>
      <HeroCard place={{ wave: Waves.Vanguard, position: Positions.Center }}></HeroCard>
      <HeroCard place={{ wave: Waves.Vanguard, position: Positions.Right }}></HeroCard>
      <HeroCard place={{ wave: Waves.Flank, position: Positions.Left }}></HeroCard>
      <LeaderCard></LeaderCard>
      <HeroCard place={{ wave: Waves.Flank, position: Positions.Right }}></HeroCard>
      <HeroCard place={{ wave: Waves.Rear, position: Positions.Left }}></HeroCard>
      <HeroCard place={{ wave: Waves.Rear, position: Positions.Center }}></HeroCard>
      <HeroCard place={{ wave: Waves.Rear, position: Positions.Right }}></HeroCard>

    </div>
  );
};

export default Unit;
