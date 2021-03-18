import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import GamePage from '../pages/game/GamePage';

const Router: React.FC<unknown> = () => {
  return (
    <>
      <Redirect exact from='/' to='/game' />
      <Route path='/game' exact component={GamePage} />
      {/* <Route path='/test' component={TestComponent} /> */}
    </>
  );
};

export default Router;
