import React, { useRef, useState } from 'react';
import { makeStyles, createStyles, Fade, Popper } from '@material-ui/core';
import { MagnifiedContext } from './HeroCard';
import {
  CARD_DIMENSIONS,
  TRANSITION_TIMEOUT,
} from '../../../shared/constants/CardGeometry';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        width: '100%',
        height: '100%',
      },
      popperContainer: {
        // width: '100%',
        // height: '100%',
        marginLeft: theme.spacing(2),
        width: CARD_DIMENSIONS.width * CARD_DIMENSIONS.magnifyMultipliers.width,
        height:
          CARD_DIMENSIONS.width * CARD_DIMENSIONS.magnifyMultipliers.height,
        boxShadow: '0 0 40px 10px #00000099',
      },
    }),
  { name: 'WithPopperPreview' },
);

const WithPopperPreview = <P extends Record<string, any>>(
  Child: React.ComponentType<P>,
  popperComponentProps?: Partial<P>,
) => {
  const WithPopperPreview: React.FC<P> = (props: P) => {
    const classes = useStyles();
    const anchorRef = useRef<HTMLDivElement>(null);

    const [popperOpen, setPopperOpen] = useState(false);
    const handlePopoverOpen = () => setPopperOpen(true);
    const handlePopoverClose = () => setPopperOpen(false);
    return (
      <>
        <div
          className={classes.root}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          ref={anchorRef}
        >
          <Child {...props}></Child>
        </div>

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
                  <Child {...props} {...popperComponentProps} />
                </MagnifiedContext.Provider>
              </div>
            </Fade>
          )}
        </Popper>
      </>
    );
  };
  WithPopperPreview.displayName = `${Child.displayName}-WithPopperPreview`;

  return WithPopperPreview;
};

export default WithPopperPreview;
