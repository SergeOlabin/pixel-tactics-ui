import React, { useState } from 'react';
import { makeStyles, createStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { IMessage } from '../types';

const useStyles = makeStyles(theme => createStyles({
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
}), { name: 'Chat' });

export interface IChatProps {
  messages?: IMessage[],
}



const Messages: React.FC<IChatProps> = ({ messages }) => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.messageArea}>
        {
          messages?.map(m => (
            <ListItem key='1'>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={m.content} />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={m.time} />
                </Grid>
              </Grid>
            </ListItem>
          ))
        }

        {/* <ListItem key='2'>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary='Hey, Iam Good! What about you ?' />
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary='09:31' />
            </Grid>
          </Grid>
        </ListItem> */}
      </List>
    </>
  );
};

export default Messages;
