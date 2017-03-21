import React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory } from 'react-router'

/* Relay */
import Relay from 'react-relay'
import IsomorphicRouter from 'isomorphic-relay-router';
import IsomorphicRelay from 'isomorphic-relay'
import routes from './routes'
const environment = new Relay.Environment();

environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const data = JSON.parse(document.getElementById('preloadedData').textContent);

IsomorphicRelay.injectPreparedData(environment, data);

const rootElement = document.getElementById('app');

// use the same routes object as on the server
match({ routes, history: browserHistory }, (error, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then((props) => {
        render(<Router {...props} />, rootElement);
    });
});