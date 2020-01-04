import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';
import { DefinitelyTyped } from './definitelyTyped/definitelyTyped';
import { Home } from './home/home';
import { Navigation } from './navigation/navigation';
import { Performance } from './performance/performance';

export function App(): JSX.Element {
  return <div className='App-container'>
    <Router>
      <div className='App-navigation'>
        <Navigation/>
      </div>

      <div className='App-content'>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/performance'>
            <Performance/>
          </Route>
          <Route path='/definitelyTyped'>
            <DefinitelyTyped/>
          </Route>
        </Switch>
      </div>
    </Router>
  </div>;
}
