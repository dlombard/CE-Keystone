import React from 'react'
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router'
import Home from './views/Home'
import SongsList from './views/SongsList'
import Song from './views/Song'
import Base from './components/Layout/Base'
import { queries as ViewerQueries } from './queries/Viewer'
import { queries as SongQueries } from './queries/Song'
import { queries as MostViewedQueries } from './queries/MostViewed'
import { queries as AlgoliaQueries } from './queries/SongFromAlgolia'
import Search from './views/Search'
import MostViewed from './views/MostViewed'
import Contactus from './views/Contactus'
import SongFromAlgolia from './views/SongFromAlgolia'

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
            <Route path="/songs/:book" component={SongsList} queries={ViewerQueries}>
            </Route>
            <Route path="/songs/:book/:id" component={Song} queries={SongQueries} />
            <Route path="/search" component={Search}></Route>
            <Route path="/search/:id" component={SongFromAlgolia} queries={AlgoliaQueries}></Route>
            <Route path="/most-viewed" component={MostViewed} queries={MostViewedQueries} />
            <Route path="contact-us" component={Contactus} />
        </Route >
    </Router >
)
