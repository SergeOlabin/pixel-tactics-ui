import React from 'react';
import CardIcon from './CardIcon';
import { makeStyles } from '@material-ui/core';

export interface IHeaderIconProps {
  children: React.ReactNode,
  src: any,
}

const styles = makeStyles({
  root: {
    position: 'relative',
  },
  iconContainer: {
    position: 'relative',
  },
  custom: {
    position: 'absolute',
    left: '7px',
    top: 0,
  },
});

const HeaderIcon: React.FC<IHeaderIconProps> = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>
        <CardIcon
          src={props.src}
        >
        </CardIcon>

      </div>
      <div className={classes.custom}>
        {props.children}
      </div>
    </div>
  );
};

export default HeaderIcon;
