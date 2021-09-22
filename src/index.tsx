import React, { useState } from 'react';
import ReactDom from 'react-dom'
import CodeEditor from './components/code-editor'
import Preview from './components/preview';
import bundler from './bundler';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';

const App = () => {
    const [input, setInput] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const onclick = async () => {
        setCode(await bundler(input));
    }

    return <div>
        <CodeEditor initialValue={`import React from 'react';
import ReactDom from 'react-dom';

const App = () => <h1 style={{color:"red"}}> Hi There !!!!!! </h1>;

const root = document.querySelector('#root');
console.log(root);
ReactDom.render(<App />, document.querySelector('#root'));`}
            onChange={(value: string) => console.log(setInput(value))} />
        <div className=""><button onClick={onclick}>Submit</button></div>
        <Preview code={code} />
    </div>
}

ReactDom.render(<App />, document.querySelector("#root"))