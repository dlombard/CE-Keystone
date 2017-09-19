import React from 'react'
import { render } from 'react-dom'
import { createBrowserRouter, HttpError, makeRouteConfig, Redirect, Route, resolver }
    from 'found';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import routes from './routes'
/* Relay */
import Relay from 'react-relay'
import { Resolver } from 'found-relay';
import environment from './createRelayEnvironment'

const BrowserRouter = createFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares: [queryMiddleware],
    routeConfig: routes,
    render: createRender({}),
    renderError: ({ error }) => (
        <div>
            {error.status === 404 ? 'Not found' : 'Error'}
        </div>
    ),
});

render(
    <BrowserRouter resolver={new Resolver(environment)} />,
    document.getElementById('app'),
);

/*
            <Route path="/songs/:book" Component={SongsList} >
            </Route>
            <Route path="/songs/:book/:id" Component={Song} />
            <Route path="/search" Component={Search}></Route>
            <Route path="/search/:id" Component={SongFromAlgolia}></Route>

render(
    (
        <Router history={browserHistory}
        >
            <Route path="/" component={Base}>
                <IndexRoute component={Home} />
                <Route path="/songs/:book" component={SongsList} >
                </Route>
                <Route path="/songs/:book/:id" component={Song} />
                <Route path="/search" component={Search}></Route>
                <Route path="/search/:id" component={SongFromAlgolia}></Route>

                <Route path="contact-us" component={Contactus} />
            </Route >
        </Router >
    ), document.getElementById('app'))*/
//                <Route path="/most-viewed" component={MostViewed}/>