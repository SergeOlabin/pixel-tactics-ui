import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Players, Waves, Positions } from '../common/Types';
import { IAppState } from '../store/store';
import HeroCard from './HeroCard';
import LeaderCard from './LeaderCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
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
  console.log('props', props);
  const playerBoard = useSelector((state: IAppState) => state.gameState.board[props.player]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={1}>
          <Grid item>
            <HeroCard place={{ wave: Waves.Vanguard, position: Positions.Left }}></HeroCard>
          </Grid>
          <Grid item>
            <HeroCard place={{ wave: Waves.Vanguard, position: Positions.Center }}></HeroCard>
          </Grid>
          <Grid item>
            <HeroCard place={{ wave: Waves.Vanguard, position: Positions.Right }}></HeroCard>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item>
            <HeroCard place={{ wave: Waves.Flank, position: Positions.Left }}></HeroCard>
          </Grid>
          <Grid item>
            <LeaderCard></LeaderCard>
          </Grid>
          <Grid item>
            <HeroCard place={{ wave: Waves.Flank, position: Positions.Right }}></HeroCard>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item>
            <HeroCard place={{ wave: Waves.Rear, position: Positions.Left }}></HeroCard>
          </Grid>
          <Grid item>
            <HeroCard place={{ wave: Waves.Rear, position: Positions.Center }}></HeroCard>
          </Grid>
          <Grid item>
            <HeroCard place={{ wave: Waves.Rear, position: Positions.Right }}></HeroCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Unit;
