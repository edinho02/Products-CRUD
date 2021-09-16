import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import RegisterProduct from '../components/pages/RegisterProduct';
import Home from '../components/pages/Home';

function Routes(props) {
  return (
    <Switch>
      <Route exact path='/' render={data => <Home />} />
      <Route
        path='/product'
        render={data => <RegisterProduct routeData={data} />}
      />
      <Redirect from='*' to='/' />
    </Switch>
  );
}

export default Routes;
