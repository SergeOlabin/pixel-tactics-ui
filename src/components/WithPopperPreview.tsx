import React, { useRef, useState } from 'react';
import { makeStyles, createStyles, Fade, Popper } from '@material-ui/core';
import { CARD_DIMENSIONS, TRANSITION_TIMEOUT } from '../common/Constants';
import { MagnifiedContext } from './HeroCard';

const useStyles = makeStyles(theme => createStyles({
  popperContainer: {
    marginLeft: theme.spacing(2),
    width: CARD_DIMENSIONS.width * CARD_DIMENSIONS.magnifyMultipliers.width,
    height: CARD_DIMENSIONS.width * CARD_DIMENSIONS.magnifyMultipliers.height,
    boxShadow: '0 0 40px 10px #00000099',
  },
}), { name: 'WithPopperPreview' });

export interface IWithPopperPreviewProps {

}

const WithPopperPreview = <P extends Record<string, any>>(Child: React.ComponentType<P>) => {
  const AAA: React.FC<P> = (props: P) => {
    const classes = useStyles();
    const anchorRef = useRef<HTMLDivElement>(null);

    const [popperOpen, setPopperOpen] = useState(false);
    const handlePopoverOpen = () => setPopperOpen(true);
    const handlePopoverClose = () => setPopperOpen(false);
    return (
      <>
        <div
          // className={classes.container}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          ref={anchorRef}
        >
          <Child {...props}></Child>
        </div>

        {
          (
            <Popper
              style={{ zIndex: 100 }}
              anchorEl={anchorRef.current}
              open={popperOpen}
              placement='right'
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={TRANSITION_TIMEOUT}>
                  <div className={classes.popperContainer}>
                    <MagnifiedContext.Provider value={true}>
                      <Child {...props} />
                    </MagnifiedContext.Provider>
                  </div>
                </Fade>
              )}
            </Popper >
          )
        }
      </>
    );
  };

  return AAA;
};

export default WithPopperPreview;
