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
    onResolveMatch: () => { console.log('onResolveMatch')},
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
