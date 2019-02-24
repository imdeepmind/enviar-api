import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReallySmoothScroll from 'really-smooth-scroll';

import Home from './routes/home';

ReallySmoothScroll.shim();

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = localStorage.getItem('user');
  return (
    <Route {...rest} render={(props) => (
      auth
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" exact component={null} />
            <Route path="/register" exact component={null} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
