import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Profile from './components/profile/Profile';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Reboot.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />

          <Switch>
            <Route path='/profile/:userId' component={Profile} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
