import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReallySmoothScroll from 'really-smooth-scroll';

import Login from './routes/login';
import Register from './routes/register';
import Home from './routes/home';

ReallySmoothScroll.shim();

const baseUrl = process.env.PUBLIC_URL;

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
      <Router basename={baseUrl}>
        <div className="App">
          <Switch>
            <Route path={"/login"} exact component={Login} />
            <Route path={"/register"} exact component={Register} />
            <Route path={"/"} exact component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
