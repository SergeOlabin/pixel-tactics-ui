import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import ActiveUserInfo from './components/ActiveUserInfo';
import OnChallengeCancelDialog from './components/dialogs/OnChallengeCancelDialog';
import OnChallengeDialog from './components/dialogs/OnChallengeDialog';
import FriendsInfo from './components/FriendsInfo';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      headBG: {
        backgroundColor: '#e0e0e0',
      },
      borderRight500: {
        borderRight: '1px solid #e0e0e0',
      },
    }),
  { name: 'Sidebar' },
);

export interface ISidebarProps {}

const Sidebar: React.FC<ISidebarProps> = ({}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3} className={classes.borderRight500}>
        <ActiveUserInfo />
        <Divider />
        <Grid item xs={12} style={{ padding: '10px' }}>
          {/* <TextField id='outlined-basic-email' label='Search' variant='outlined' fullWidth /> */}
        </Grid>
        {/* <Divider /> */}
        <Typography variant='h4'>Friends</Typography>
        <FriendsInfo />
      </Grid>
      <OnChallengeDialog />
      <OnChallengeCancelDialog />
    </>
  );
};

export default Sidebar;
