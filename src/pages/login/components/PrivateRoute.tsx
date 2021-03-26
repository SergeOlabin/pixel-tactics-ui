import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootStateType } from '../../../store/store';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constants/auth-token.constant';

interface IPrivateRouteProps extends Record<string, any> {
  component: React.FC<any>;
  roles?: string[];
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const userInfo = useSelector((state: RootStateType) => state.userInfo);
  const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

  let allowed = Boolean(token);

  if (roles) {
    allowed = roles
      ? Boolean(userInfo && roles.some((role) => userInfo.roles.includes(role)))
      : true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        allowed ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
