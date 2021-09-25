import React from 'react';
import ReactDom from 'react-dom'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';
import TextEditor from './components/text-editor';
import { store } from './state';
import { Provider } from 'react-redux';

const App = () => {
    return <Provider store={store}>
        <div>
            {/* <CodeCell /> */}
            <TextEditor />
        </div>
    </Provider>

}

ReactDom.render(<App />, document.querySelector("#root"))