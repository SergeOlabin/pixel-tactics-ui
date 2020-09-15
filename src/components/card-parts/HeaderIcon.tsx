import React from 'react';
import { makeStyles } from '@material-ui/core';

export interface IHeaderIconProps {
  children: React.ReactNode,
  src: any,
}

const styles = makeStyles({
  root: {
    position: 'relative',
    // zIndex: 40,
  },
  iconContainer: {
    position: 'relative',
    left: -6,
    top: -5,
  },
  content: {
    position: 'absolute',
    left: '7px',
    top: 0,
  },
}, { name: 'HeaderIcon' });

const HeaderIcon: React.FC<IHeaderIconProps> = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>
        <img src={props.src}/>
      </div>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
};

export default HeaderIcon;
