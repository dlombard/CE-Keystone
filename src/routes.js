import React from 'react'
import {
  Route,
  Switch,
  Router
} from 'react-router-dom'
import { render } from "react-dom";
import history from './utils/history'
import Base from './modules/base/Base'
import ErrorBoundary from './ErrorBoundary';

const routes = (client) => {
  console.log(window.navigator.userAgent)
  return (
    <ErrorBoundary>
        <Router history={history}>
          <Switch>
            <Route path="/" render={(props) => <Base client={client} {...props} />} />
          </Switch>
        </Router>
    </ErrorBoundary>
  )
}



export default routes