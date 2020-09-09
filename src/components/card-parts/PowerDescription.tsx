import { makeStyles } from '@material-ui/core';
import React from 'react';

export interface IPowerDescriptionProps {
  additionalClasses?: string[],
}

const useStyles = makeStyles({
  descriptionBlock: {
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '2px',
    margin: '2px 3px',
    flexGrow: 0,
    width: 140,
    fontSize: 8,
    lineHeight: 1.1,
    textAlign: 'left',
    padding: 2,
    height: 30,
    display: 'flex',
    alignItems: 'center',
  },
});

const PowerDescription: React.FC<IPowerDescriptionProps> = (props) => {
  const classes = useStyles();

  return (
    <section className={[classes.descriptionBlock, ...props.additionalClasses || []].join(' ')}>
      {props.children}
    </section>
  );
};

export default PowerDescription;
