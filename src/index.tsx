import React from 'react';
import ReactDom from 'react-dom'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';
import CodeCell from './components/code-cell';

const App = () => {
    return <div> <CodeCell /></div>
}

ReactDom.render(<App />, document.querySelector("#root"))