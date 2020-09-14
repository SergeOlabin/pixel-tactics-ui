import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#e4e8f1',
    borderRadius: '4px',
    border: '2px solid #171818',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '&.empty': {
      border: '2px dotted #171818',
    },
  },
  header: (props?: any) => ({
    height: props.singleDescription ? 40 : 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 5px',
  }),
  content: {
    flexGrow: 1,
    display: 'grid',
    gridAutoRows: 'minmax(1px, 1fr)',
    minWidth: '100%',
    overflow: 'hidden',
  },
}, { name: 'CardTemplate' });

interface ICardTemplateProps {
  children: {
    header?: React.ReactNode,
    content?: React.ReactNode,
    className?: string,
  },
  singleDescription?: boolean,
}

const CardTemplate: React.FC<ICardTemplateProps> = (props) => {
  const classes = useStyles(props);

  return (
    <section className={classes.root}>
      <header className={classes.header}>
        {props.children.header}
      </header>
      <div className={classes.content}>
        {props.children.content}
      </div>
    </section>
  );
};

export const EmptyCardTemplate: React.FC<unknown> = () => {
  const classes = useStyles();

  return (
    <section className={[classes.root, 'empty'].join(' ')}>No Card</section>
  );
};

export default CardTemplate;
