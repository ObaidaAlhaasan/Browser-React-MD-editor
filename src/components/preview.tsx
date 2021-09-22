import React, { useEffect, useRef } from 'react'

interface IPreviewProps {
    code: string;
}

const Preview: React.FC<IPreviewProps> = ({ code }) => {
    const iframeRef = useRef<any>();
    useEffect(() => {
        iframeRef.current.srcdoc = code;
        iframeRef.current?.contentWindow?.postMessage(code, '*');
        console.log(code);

    }, [code]);

    return (
        <iframe ref={iframeRef} title="Preview" sandbox="allow-modals allow-forms allow-popups allow-scripts" />
    )
}

export default Preview
