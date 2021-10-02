import React from 'react';
import ReactDom from 'react-dom'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';
import { store } from './state';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';

const App = () => {
    return <Provider store={store}>
        <div>
            {/* <CodeCell /> */}
            {/* <TextEditor /> */}
            <CellList />
        </div>
    </Provider>

}

ReactDom.render(<App />, document.querySelector("#root"))