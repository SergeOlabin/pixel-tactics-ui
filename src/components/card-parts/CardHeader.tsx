import React from 'react';
import HeaderIcon from './HeaderIcon';
import { makeStyles } from '@material-ui/core';

export interface ICardStats {
  attack: number,
  health: number,
}

export interface ICardHeaderProps {
  name: string,
  stats: ICardStats,
  singleDescription?: boolean,
}

const useStyles = makeStyles({
  stats: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ee3433',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  },
  name: {
    fontSize:12,
  },
});

const CardHeader: React.FC<ICardHeaderProps> = (props) => {
  const classes = useStyles();
  const iconSize = 16;
  const attackIcon = `https://img.icons8.com/wired/${iconSize}/000000/sword.png`;
  const shieldIcon = `https://img.icons8.com/dotty/${iconSize}/000000/shield.png`;
  return (
    <React.Fragment>
      <span className={classes.name}>{props.name}</span>
      <HeaderIcon src={attackIcon}>
        <span className={classes.stats}>{props.stats.attack}</span>
      </HeaderIcon>
      <HeaderIcon src={shieldIcon}>
        <span className={classes.stats}>{props.stats.health}</span>
      </HeaderIcon>
    </React.Fragment>
  );
};

export default CardHeader;
