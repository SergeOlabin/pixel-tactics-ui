import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

export interface IPowerDescriptionProps {
  additionalClasses?: string[],
}

const useStyles = makeStyles(theme => ({
  descriptionBlock: {
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '2px',
    margin: theme.spacing(0.25),
    height: 'auto',
    maxHeight: '100%',
    fontSize: 8,
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
  },
  textAlign: {
    textAlign: 'center',
  },
}), { name: 'PowerDescription' });

const PowerDescription: React.FC<IPowerDescriptionProps> = (props) => {
  const classes = useStyles();

  return (
    <section className={[classes.descriptionBlock, ...props.additionalClasses || []].join(' ')}>
      <Typography
        variant='body2'
        className={classes.textAlign}>
        {props.children}
      </Typography>
    </section>
  );
};

export default PowerDescription;
