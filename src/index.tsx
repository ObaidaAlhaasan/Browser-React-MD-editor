import React from 'react';
import ReactDom from 'react-dom'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';
import TextEditor from './components/text-editor';

const App = () => {
    return <div>
        {/* <CodeCell /> */}
        <TextEditor />
    </div>
}

ReactDom.render(<App />, document.querySelector("#root"))