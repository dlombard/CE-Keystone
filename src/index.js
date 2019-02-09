import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  AnonymousCredential
} from 'mongodb-stitch-browser-sdk';
import routes from './routes'

import { client } from './Stitch'

const init = async () => {
  await client.auth.loginWithCredential(new AnonymousCredential())
  ReactDOM.render(routes(client), document.getElementById('root'));
  serviceWorker.unregister();
}
init()
