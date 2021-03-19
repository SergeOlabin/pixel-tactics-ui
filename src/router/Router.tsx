import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UsersPage from '../pages/admin-users/UsersPage';
import GamePage from '../pages/game/GamePage';

const Router: React.FC<unknown> = () => {
  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/game' />
        <Route path='/game' exact component={GamePage} />
        <Route path='/users' exact component={UsersPage} />
        {/* <Route path='/test' component={TestComponent} /> */}
      </Switch>

    </>
  );
};

export default Router;
