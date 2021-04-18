import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../views/landingPage';
import HomePage from '../views/homePage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/home-page">
        <HomePage />
      </Route>
    </Switch>
  );
}
