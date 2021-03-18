import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { MagnifiedContext } from '../HeroCard';

export interface IPowerDescriptionProps {
  additionalClasses?: string[],
  magnified?: boolean,
}

const useStyles = makeStyles(theme => ({
  descriptionBlock: (props?: any) => ({
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '2px',
    marginTop: props?.magnified ? theme.spacing(0.75) : theme.spacing(0.25),
    height: 'auto',
    maxHeight: '100%',
    lineHeight: 1.1,
    textAlign: 'left',
    padding: theme.spacing(0.25),
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    '& > p': {
      width: '100%',
      maxHeight: '100%',
      padding: theme.spacing(0.25),
      position: 'relative',
    },
  }),
  textAlign: {
    textAlign: 'center',
  },
}), { name: 'PowerDescription' });

const PowerDescription: React.FC<IPowerDescriptionProps> = (props) => {
  const magnified = useContext(MagnifiedContext);
  const classes = useStyles({
    magnified,
  });

  return (
    <section className={[classes.descriptionBlock, ...props.additionalClasses || []].join(' ')}>
      <Typography
        variant={ magnified ? 'body1' : 'body2' }
        className={classes.textAlign}>
        {props.children}
      </Typography>
    </section>
  );
};

export default PowerDescription;
