import React, { useEffect, useRef } from 'react'

interface IPreviewProps {
    code: string;
}

const Preview: React.FC<IPreviewProps> = ({ code }) => {
    const iframeRef = useRef<any>();


    useEffect(() => {
        const htmlCode = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener("message", (evt) => {
                    try {
                        eval(evt.data)
                    } catch (error) {
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div style="color: red;"> <h4> Runtime Error:  </h4>' + error + '</div>';
                        console.error(error);
                    }
                }, false)
            </script>
        </body>
        
        </html>`;
        iframeRef.current.srcdoc = htmlCode;
        iframeRef.current?.contentWindow?.postMessage(code, '*');
    }, [code]);

    return (
        <iframe ref={iframeRef} title="Preview" sandbox="allow-modals allow-forms allow-popups allow-scripts" />
    )
}

export default Preview
