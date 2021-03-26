import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UsersPage from '../pages/admin-users/UsersPage';
import GamePage from '../pages/game/GamePage';
import PrivateRoute from '../pages/login/components/PrivateRoute';
import ProtectedRoute from '../pages/login/components/ProtectedRoute';
import Login from '../pages/login/Login';
import MenuPage from '../pages/menu/MenuPage';

const Router: React.FC<unknown> = () => {
  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/menu' />
        <Route path='/game' exact component={GamePage} />
        <ProtectedRoute
          path='/users'
          roles={['admin']}
          exact
          component={UsersPage}
        />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/menu' exact component={MenuPage} />
      </Switch>
    </>
  );
};

export default Router;
