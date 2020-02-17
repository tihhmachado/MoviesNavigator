import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './Pages/main';
import Titles from './Pages/titles';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/titles/:id" component={Titles} />
      </Switch>
    </BrowserRouter>
  )
}
