import * as esBuild from 'esbuild-wasm'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './app.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom'
import { fetchPlugin } from './plugins/fetch';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';
import CodeEditor from './components/code-editor'
import Preview from './components/preview';
const App = () => {
    let ref = useRef<esBuild.Service>();
    const [input, setInput] = useState<string>('');
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        startService()
    }, []);

    const startService = async () => {
        ref.current = await esBuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        });

    }

    const onclick = async () => {
        if (!ref.current)
            return;

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"produciton"',
                global: 'window'
            }
        });

        setCode(result.outputFiles[0].text);
    }

    return <div>
        <CodeEditor initialValue={`import React from 'react';
import ReactDom from 'react-dom';

const App = () => <h1 style={{color:"red"}}> Hi There </h1>;

const root = document.querySelector('#root');
console.log(root);
ReactDom.render(<App />, document.querySelector('#root'));
alert('HI');`}
            onChange={(value: string) => console.log(setInput(value))} />
        <div className=""><button onClick={onclick}>Submit</button></div>
        <Preview code={code} />
    </div>
}

ReactDom.render(<App />, document.querySelector("#root"))