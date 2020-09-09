import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import TestComponent from './TestComponent';

function App() {
  return (
    <div>
      <Route path='/' exact component={HomePage} />
      <Route path='/test' component={TestComponent} />
    </div>
  );
}

export default App;
