import React, { useEffect } from 'react';
import CodeEditor from './code-editor'
import Preview from './preview';
import Resizable, { ResizableDirection } from './resizable';
import { Cell, CellType } from '../state';
import useActions from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

const initialCode = `import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <h1 style={{color:"red"}}> Hi There !!!!!! </h1>;

const root = document.querySelector('#root');
ReactDom.render(<App />, document.querySelector('#root'));`;
interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);

    useEffect(() => {
        if (!bundle) {
            createBundle({ cellId: cell.id, input: cumulativeCode.join("\n") });
            return;
        }

        const timer = setTimeout(async () => {
            await createBundle({ cellId: cell.id, input: cumulativeCode.join("\n") });
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode.join("\n"), createBundle]);

    return <Resizable direction={ResizableDirection.vertical}>
        <div style={{ height: 'calc(100% - 100px)', display: 'flex', flexDirection: 'row' }}>
            <Resizable direction={ResizableDirection.horizontal}><CodeEditor initialValue={cell.content} onChange={(value) => updateCell({ id: cell.id, content: value })} /></Resizable>
            <div className="progress-wrapper">
                {!bundle || bundle.loading
                    ?
                    <div className="progress-cover">
                        <progress className="progress is-small is-primary" max="100">
                            Loading...
                        </progress>
                    </div>
                    :
                    <Preview code={bundle.code} bundleStatus={bundle.err} />
                }
            </div>
        </div>
    </Resizable>
}

export default CodeCell;