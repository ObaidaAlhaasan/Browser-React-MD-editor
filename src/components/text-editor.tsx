import React, { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import "./text-editor.css";
import { Cell } from '../state';
import useActions from '../hooks/use-actions';

interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updateCell } = useActions();

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickListener = (evt: MouseEvent) => {
            if (ref.current && evt.target && ref.current.contains(evt?.target as Node)) return console.log("Click inside Text Editor");

            setIsEditing(false);
        };

        window.addEventListener("click", clickListener, { capture: true });

        return () => window.removeEventListener("click", clickListener);

    }, []);

    if (isEditing) return <div className="text-editor" ref={ref}><MDEditor value={cell.content} onChange={(v) => updateCell({ id: cell.id, content: v ?? "" })} /></div>

    return (
        <div className="text-editor card" onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
        }}>
            <div className="card-content"><MDEditor.Markdown source={cell.content || 'Click to edit!'} /></div>
        </div>
    )
}

export default TextEditor;