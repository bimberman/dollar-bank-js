import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../views/landingPage';
import LogIn from '../components/logIn';
import Home from '../views/home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route path="/login">
        <LogIn />
      </Route>
    </Switch>
  );
}
