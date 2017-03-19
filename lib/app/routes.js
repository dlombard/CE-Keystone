import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router'
import App from './views/App'
import Home from './views/Home'
import SongsList from './views/SongsList'
import Song from './views/Song'
import About from './views/About'
import Base from './components/Layout/Base'
import { queries as ViewerQueries } from './queries/Viewer'
import { queries as SongQueries } from './queries/Song'
import Search from './views/Search'
/* Relay */
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://localhost:4088/graphql')
)

module.exports = (
    <Router history={browserHistory}
        environment={Relay.Store}
        render={applyRouterMiddleware(useRelay)}
    >
        <Route path="/" component={Base}>
            <IndexRoute component={Home} queries={ViewerQueries} />
            <Route path="/about" component={About} />
            <Route path="/songs/:book" component={SongsList} queries={ViewerQueries}>
            </Route>
            <Route path="/songs/:book/:id" component={Song} queries={SongQueries} />
            <Route path="/search" component={Search} />
        </Route>
    </Router>
)
