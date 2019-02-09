import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import history from './utils/history'

const middleware = routerMiddleware(history)


export default createStore(applyMiddleware(middleware));
