import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './views/App'
import Home from './views/Home'
import SongsList from './views/SongsList'
import Song from './views/Song'
import About from './views/About'
import Base from './components/Layout/Base'

module.exports = (
    <Router >
        <Route path="/" component={Base}>
            <IndexRoute component={Home} />
            <Route path="/songs/:book" component={SongsList}>
                <Route path="/:book/:id" component={Song} />
            </Route>
            <Route path="/about" component={About} />
        </Route>
    </Router>
)