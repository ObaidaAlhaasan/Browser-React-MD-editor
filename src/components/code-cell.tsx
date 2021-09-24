import React, { useState } from 'react';
import CodeEditor from './code-editor'
import Preview from './preview';
import bundler from '../bundler';
import Resizable, { ResizableDirection } from './resizable';

const initialCode = `import React from 'react';
import ReactDom from 'react-dom';

const App = () => <h1 style={{color:"red"}}> Hi There !!!!!! </h1>;

const root = document.querySelector('#root');
ReactDom.render(<App />, document.querySelector('#root'));`;

const CodeCell = () => {
    const [input, setInput] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const onclick = async () => {
        setCode(await bundler(input));
    }

    return <Resizable direction={ResizableDirection.vertical}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Resizable direction={ResizableDirection.horizontal}><CodeEditor
                initialValue={initialCode}
                onChange={(value) => setInput(value)} /></Resizable>
            <Preview code={code} />
        </div>
    </Resizable>
}

export default CodeCell;