import React, { useEffect, useRef, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import "./text-editor.css";
const TextEditor: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickListener = (evt: MouseEvent) => {
            if (ref.current && evt.target && ref.current.contains(evt?.target as Node)) return console.log("Click inside Text Editor");

            setIsEditing(false);
        };

        window.addEventListener("click", clickListener, { capture: true });

        return () => window.removeEventListener("click", clickListener);

    }, []);

    if (isEditing) return <div className="text-editor" ref={ref}><MDEditor /></div>

    return (
        <div className="text-editor" onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
        }}>
            <MDEditor.Markdown source="# Hello There" />
        </div>
    )
}

export default TextEditor;