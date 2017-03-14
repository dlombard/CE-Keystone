'use strict';

// React And Redux Setup
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../app/routes';
import graphql from '../graphql/graphqlHTTP'
import bodyParser from 'body-parser'
import Relay from 'react-relay'
import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path'
import logger from 'winston'
// api
import songs from './api/songs';

const GRAPHQL_URL = `http://localhost:3000/graphql`;

const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);
// Setup Route Bindings
exports = module.exports = (app) => {
    app.use('/graphql', bodyParser.json(), graphql());
    // Views
    logger.log('info', __dirname)
    app.get('/api/songs/id/:id', songs.get)
    app.get('/api/songs/:book', songs.list)
    
    // match the backend routes with the client routes
    app.use((req, res, next) => {
        if (req.path.match(/^\/keystone/)) {
            next();
            return;
        }

        match({ routes, location: req.url }, (err, redirect, props) => {
            if (err) {
                res.status(500).send(err.message)
            } else if (redirect) {
                res.redirect(redirect.pathname + redirect.search)
            } else if (props) {
                IsomorphicRouter.prepareData(props, networkLayer).then(render).catch(next);
                // hey we made it!
                //const appHtml = renderToString(<RouterContext {...props} />)
                //res.send(renderPage(appHtml))
            } else {
                res.status(404).send('Not Found')
            }
        })
        function render({ data, props }) {
            const reactOutput = ReactDOMServer.renderToString(IsomorphicRouter.render(props));
            res.render('index.ejs', {
                preloadedData: data,
                reactOutput
            });
        }
    });

};
