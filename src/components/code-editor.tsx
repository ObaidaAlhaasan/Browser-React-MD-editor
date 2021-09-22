import React, { useRef } from 'react';
import MonacoEditor, { EditorDidMount, } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import './code-editor.css';
import './syntax.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue: string;
    onChange: (val: string) => void;
}


const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
    const onEditorDidMount: EditorDidMount = (getVal: () => string, monacoEditor: monacoEditor.editor.IStandaloneCodeEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            const val = getVal();
            onChange(val);
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2, indentSize: 2, trimAutoWhitespace: true });

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
          );
          highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
          );
    };

    const onFormat = () => {
        console.log(editorRef);
        const unformatted = editorRef.current?.getModel()?.getValue() ?? "";
        const formatted = prettier.format(unformatted, { parser: 'babel', plugins: [parser], useTabs: false, singleQuote: true, semi: true }).replace(/\n$/, "");
        editorRef.current?.setValue(formatted);
    };

    return <div className="editor-wrapper">
        <button onClick={onFormat} className="button button-format is-primary is-small">Format</button>
        <MonacoEditor
            height="400px" language="javascript" theme="dark"
            value={initialValue}
            editorDidMount={onEditorDidMount}
            options={{
                wordWrap: 'on',
                minimap: { enabled: false },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }}
        />
    </div>
}

export default CodeEditor;