import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootStateType } from '../../../store/store';

interface IProtectedRouteProps extends Record<string, any> {
  component: React.FC<any>,
  roles?: string[],
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  component: Component,
  roles,
  ...rest
}) => {
  const userInfo = useSelector((state: RootStateType) => state.userInfo);

  const allowed = roles ?
    userInfo && roles.some((role) => userInfo.roles.includes(role))
    : true;

  return (
    <Route {...rest} render={props => (
      allowed ? <Redirect to='/menu' /> : <Component {...props} />
    )} />
  );
};

export default ProtectedRoute;
