import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: 150,
    height: '100%',
    minHeight: 170,
    backgroundColor: '#e4e8f1',
    borderRadius: '4px',
    border: '3px solid #171818',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '&.empty': {
      border: '2px dotted #171818',
    },
  },
  header: {
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 5px',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface IBoardCardProps {
  header?: React.ReactNode,
  content?: React.ReactNode,
}

const BoardCard: React.FC<IBoardCardProps> = (props) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <header className={classes.header}>
        {props.header}
      </header>
      <div className={classes.content}>
        {props.content}
      </div>
    </section>
  );
};

export const EmptyBoardCard: React.FC<unknown> = () => {
  const classes = useStyles();

  return (
    <section className={[classes.root, 'empty'].join(' ')}>No Card</section>
  );
};

export default BoardCard;
