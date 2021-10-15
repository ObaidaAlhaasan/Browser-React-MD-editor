import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from './action-creators';
import { persistMiddlware } from './middlewares/persist-middleware';

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(persistMiddlware, thunk),
    ),
);