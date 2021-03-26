import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import SignIn from './components/SignIn';

const useStyles = makeStyles((theme) => createStyles({}), { name: 'Login' });

export interface ILoginProps {}

const Login: React.FC<ILoginProps> = (props) => {
  const classes = useStyles();
  return (
    <>
      <SignIn />
    </>
  );
};

export default Login;
