import React, { useEffect, useState } from 'react';
import CodeEditor from './code-editor'
import Preview from './preview';
import bundler from '../bundler';
import Resizable, { ResizableDirection } from './resizable';
import { Cell } from '../state';
import useActions from '../hooks/use-actions';

const initialCode = `import React from 'react';
import ReactDom from 'react-dom';

const App = () => <h1 style={{color:"red"}}> Hi There !!!!!! </h1>;

const root = document.querySelector('#root');
ReactDom.render(<App />, document.querySelector('#root'));`;
interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [code, setCode] = useState<string>('');
    const [err, setErr] = useState('')

    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler(cell.content);
            if (output.err) {
                setErr(output.err);
                return;
            }

            setCode(output.code);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [cell.content]);

    return <Resizable direction={ResizableDirection.vertical}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Resizable direction={ResizableDirection.horizontal}><CodeEditor initialValue={cell.content} onChange={(value) => updateCell({ id: cell.id, content: value })} /></Resizable>
            <Preview code={code} bundleStatus={err} />
        </div>
    </Resizable>
}

export default CodeCell;