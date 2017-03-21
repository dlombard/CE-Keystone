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
import logger from '../../../logger'
// api
import songs from './api/songs';
var Email = require('keystone-email');
const GRAPHQL_URL = `http://localhost:4088/graphql`;

const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);
// Setup Route Bindings
exports = module.exports = (app) => {
    app.use('/graphql', bodyParser.json(), graphql());
    // Views
    logger.log('info', __dirname)
    app.get('/api/songs/id/:id', songs.get)
    app.get('/api/songs/:book', songs.list)
    app.post('/contact-us', (req, res) => {

        const name = req.body.name
        const email = req.body.email
        const subject = req.body.subject
        const comment = req.body.comment

        new Email('./templates/email/email.pug', { transport: 'mailgun', engine: 'pug' }).
            send({ comment }, {
                apiKey: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN,
                to: 'info@cesperance.com',
                from: `${name} <${email}>`,
                subject,
            }, function (err, result) {
                if (err) {
                    logger.error('Could not send email:\n', err);
                } else {
                    logger.info('📬 Successfully sent Mailgun email result:\n', result);
                    res.send(result);
                }
            });
    })
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
