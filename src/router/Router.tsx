import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Root from '../components/Root';
import UsersPage from '../pages/admin-users/UsersPage';
import GamePage from '../pages/game/GamePage';
import PrivateRoute from '../pages/login/components/PrivateRoute';
import Login from '../pages/login/Login';
import MenuPage from '../pages/menu/MenuPage';

const Router: React.FC<unknown> = () => {
  return (
    <>
      <Switch>
        <Route path='/login' exact component={Login} />

        <Redirect exact from='/' to='/menu' />
        <Root>
          <PrivateRoute path='/game' exact component={GamePage} />
          <PrivateRoute
            path='/users'
            roles={['admin']}
            exact
            component={UsersPage}
          />
          <PrivateRoute path='/menu' exact component={MenuPage} />
        </Root>
        <Redirect to='/menu' />
      </Switch>
    </>
  );
};

export default Router;
