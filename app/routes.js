import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router'
import App from './views/App'
import Home from './views/Home'
import SongsList from './views/SongsList'
import Song from './views/Song'
import About from './views/About'
import Base from './components/Layout/Base'
import { queries as SongsQueries } from './queries/Songs'
/* Relay */
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://localhost:3000/graphql')
)

module.exports = (
    <Router history={browserHistory}
        environment={Relay.Store}
        render={applyRouterMiddleware(useRelay)}
    >
        <Route path="/" component={Base}>
            <IndexRoute component={Home} />
            <Route path="/about" component={About} />
            <Route path="/:book" component={SongsList} queries={SongsQueries}>
                <Route path="/songs/:book/:id" component={Song} />
            </Route>
        </Route>
    </Router>
)