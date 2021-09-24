import React, { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import "./text-editor.css";
const TextEditor: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState<string>("# Header!");
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickListener = (evt: MouseEvent) => {
            if (ref.current && evt.target && ref.current.contains(evt?.target as Node)) return console.log("Click inside Text Editor");

            setIsEditing(false);
        };

        window.addEventListener("click", clickListener, { capture: true });

        return () => window.removeEventListener("click", clickListener);

    }, []);

    if (isEditing) return <div className="text-editor" ref={ref}><MDEditor onChange={(v) => setValue(v ?? "")} /></div>

    return (
        <div className="text-editor card" onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
        }}>
            <div className="card-content"><MDEditor.Markdown source={value} /></div>
        </div>
    )
}

export default TextEditor;