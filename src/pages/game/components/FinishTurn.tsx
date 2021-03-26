import React from 'react';
import './FinishTurn.css';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      btn: {
        display: 'flex',
        height: '100px',
        width: '100px',
        borderRadius: '50%',
        border: `1px solid ${theme.palette.success.dark}`,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.success.main,
      },
    }),
  { name: 'FinishTurnButton' },
);

const FinishTurnButton: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.btn}>ПАХАДИТЬ</div>;
};

export default FinishTurnButton;
