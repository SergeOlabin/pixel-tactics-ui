import { makeStyles } from '@material-ui/core';
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
  },
}));

const PowerDescription: React.FC<IPowerDescriptionProps> = (props) => {
  const classes = useStyles();

  return (
    <section className={[classes.descriptionBlock, ...props.additionalClasses || []].join(' ')}>
      {props.children}
    </section>
  );
};

export default PowerDescription;
