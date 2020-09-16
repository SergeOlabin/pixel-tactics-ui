import { makeStyles } from '@material-ui/core';
import React from 'react';
import HeaderIcon from './HeaderIcon';
import { ATTACK_ICON, SHIELD_ICON  } from './Icons';

export interface ICardStats {
  attack: number,
  health: number,
}

export interface ICardHeaderProps {
  name: string,
  stats: ICardStats,
  singleDescription?: boolean,
}

const useStyles = makeStyles(theme => ({
  root: {
    flexFlow: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  nameContainer: {
    // flexGrow: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  statsContainer: {
    borderRadius: '50%',
    height: 25,
    width: 25,
    // border: '2px solid #171818',
    // backgroundColor: theme.palette.background.default,
    position: 'absolute',
    zIndex: 50,
    top: -7,
  },
  attackContainer: {
    top: -17,
    left: -22,
  },
  healthContainer: {
    top: -17,
    right: -13,
  },
  attackText: {
    // position: 'a'
  },

  // statsContainer: {
  //   flexGrow: 1,
  //   display: 'flex',
  //   alignItems: 'center',
  //   height: '100%',
  //   justifyContent: 'space-evenly',
  // },
  stats: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.grey[200],
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  },
  name: {
    fontSize: 12,
  },
}), { name: 'CardHeader' });

const CardHeader: React.FC<ICardHeaderProps> = (props) => {
  const classes = useStyles();
  const iconSize = 36;
  const attackIcon = `https://img.icons8.com/officel/${iconSize}/000000/sword.png`;
  const shieldIcon = `https://img.icons8.com/color/${iconSize}/000000/shield--v1.png`;

  return (
    <div className={classes.root}>
      <div className={[classes.statsContainer, classes.attackContainer].join(' ')}>
        {/* <HeaderIcon src={attackIcon}>
          <span className={classes.stats}>{props.stats.attack}</span>
        </HeaderIcon> */}
        {ATTACK_ICON}
      </div>

      <div className={classes.nameContainer}>
        <span className={classes.name}>{props.name}</span>
      </div>
      <div className={[classes.statsContainer, classes.healthContainer].join(' ')}>
        {/* <HeaderIcon src={shieldIcon}>
          <span className={classes.stats}>{props.stats.health}</span>
        </HeaderIcon> */}
        {SHIELD_ICON}
      </div>
    </div>
  );
};

export default CardHeader;
