import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';

function App() {
  const a = { a: 'a' };

  return (
    <div>
      <Route path='/' exact component={HomePage} />
    </div>
  );
}

export default App;
