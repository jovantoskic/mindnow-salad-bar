import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddIngredients from './components/pages/AddIngredients';
import Ingredients from './components/pages/Ingredients';

import './index.scss';

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route component={AddIngredients} exact path="/" />
          <Route component={Ingredients} exact path="/ingredients" />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
