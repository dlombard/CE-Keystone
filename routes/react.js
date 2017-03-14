'use strict';

// React And Redux Setup
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../app/routes';
import pkg from '../package.json';
import graphql from '../graphql/graphqlHTTP'
import bodyParser from 'body-parser'
import Relay from 'react-relay'
import IsomorphicRouter from 'isomorphic-relay-router';
import path from 'path'
// api
import songs from './api/songs';

const GRAPHQL_URL = `http://localhost:3000/graphql`;

const networkLayer = new Relay.DefaultNetworkLayer(GRAPHQL_URL);
// Setup Route Bindings
exports = module.exports = (app) => {
    app.use('/graphql', bodyParser.json(), graphql());
    // Views
	/*app.use('/', function (req, res) {
		const ip = req.clientIp;
		getGeo(res)
		res.render('index');
	});*/
    app.get('/api/songs/id/:id', songs.get)
    app.get('/api/songs/:book', songs.list)

    // Render Initial HTML
    const appHtml = (html, initialState) => {
        const head = Helmet.rewind();
        return (
            `<!doctype html>
        <html>
          <head>
            <html>
            <meta charset=utf-8/>
            <title>My First React Router App</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
crossorigin="anonymous">
            <link href="/styles/site.css" rel="stylesheet">
          </head>
              <div id="app"></div>
            <script src='/js/bundle.js'></script>
          </body>
      </html>`
        );
    };

    const renderError = (err) => {
        const softTab = '&#32;&#32;&#32;&#32;';
        const errTrace = process.env.NODE_ENV !== 'production'
            ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
        return renderFullPage(`Server Error${errTrace}`, {});
    };

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
            console.log(reactOutput)
            res.render('index.hbs', {
                preloadedData: JSON.stringify(data),
                reactOutput
            });
        }
    });


    function renderPage(appHtml) {
        return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
    }
};
