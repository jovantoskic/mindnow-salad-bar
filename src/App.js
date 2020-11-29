import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddIngredients from './components/pages/AddIngredients';
import Ingredients from './components/pages/Ingredients';
import MakeSalad from './components/pages/MakeSalad';
import SaladOverview from './components/pages/SaladOverview';

import './index.scss';

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route component={AddIngredients} exact path="/" />
          <Route component={Ingredients} exact path="/ingredients" />
          <Route component={MakeSalad} exact path="/make-salad" />
          <Route component={SaladOverview} exact path="/salad-overview" />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
