import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from './action-creators';
import { ActionType } from './action-types';
import { CellType } from './cell';

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk),
    ),
);

store.dispatch({ type: ActionType.INSERT_CELL_BEFORE, payload: { id: '', type: CellType.Code } });
store.dispatch({ type: ActionType.INSERT_CELL_BEFORE, payload: { id: '', type: CellType.Text } });
store.dispatch({ type: ActionType.INSERT_CELL_BEFORE, payload: { id: '', type: CellType.Text } });
store.dispatch({ type: ActionType.INSERT_CELL_BEFORE, payload: { id: '', type: CellType.Code } });