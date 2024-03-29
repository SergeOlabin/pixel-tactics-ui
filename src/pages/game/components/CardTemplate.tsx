import { createStyles, makeStyles } from '@material-ui/core';
import { deepPurple, yellow } from '@material-ui/core/colors';
import React, { useContext } from 'react';
import { MagnifiedContext } from './HeroCard';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: (props?: any) => ({
        width: '100%',
        height: '100%',
        // overflow: 'hidden',
        backgroundColor: deepPurple[50],
        borderRadius: '4px',
        border: '2px solid #171818',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        padding: props?.magnified ? theme.spacing(0.75) : theme.spacing(0.25),

        boxShadow: '0px 0px 3px 0px black',
        '&.empty': {
          border: '2px dotted #171818',
          backgroundColor: yellow[50],
        },
      }),
      header: (props?: any) => ({
        height: props?.singleDescription || props?.magnified ? 40 : 20,
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
    }),
  { name: 'CardTemplate' },
);

interface ICardTemplateProps {
  children: {
    header?: React.ReactNode;
    content?: React.ReactNode;
    className?: string;
  };
  singleDescription?: boolean;
  magnified?: boolean;
}

const CardTemplate: React.FC<ICardTemplateProps> = ({
  children,
  singleDescription,
  // magnified,
}) => {
  const magnified = useContext(MagnifiedContext);
  const classes = useStyles({
    singleDescription,
    magnified,
  });

  return (
    <section className={classes.root}>
      <div className={classes.header}>{children.header}</div>
      <div className={classes.content}>{children.content}</div>
    </section>
  );
};

export const EmptyCardTemplate: React.FC<unknown> = () => {
  const classes = useStyles({
    root: {},
  });

  return (
    <section className={[classes.root, 'empty'].join(' ')}>No Card</section>
  );
};

export default CardTemplate;
