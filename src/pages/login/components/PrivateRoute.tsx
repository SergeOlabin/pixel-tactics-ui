import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constants/auth-token.constant';

interface IPrivateRouteProps extends Record<string, any> {
  component: React.FC<any>;
  roles?: string[];
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  // const userInfo = useSelector((state: RootStateType) => state.userInfo);
  const token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
