import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import ReactDom from 'react-dom'
import './app.css';
import { store } from './state';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';

const App = () => {
    return <Provider store={store}>
        <div>
            <CellList />
        </div>
    </Provider>

}

ReactDom.render(<App />, document.querySelector("#root"))