import React, { useEffect, useRef } from 'react';
import './preview.css';
interface IPreviewProps {
    code: string;
    bundleStatus: string;
}

const Preview: React.FC<IPreviewProps> = ({ code, bundleStatus }) => {
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
                const errHandler = (error)=>{
                    const root = document.querySelector("#root");
                    root.innerHTML = '<div style="color: red;"> <h4> Runtime Error:  </h4>' + error + '</div>';
                    console.error(error);
                }
                window.addEventListener("error", (evt)=> {
                    console.log(evt);
                    evt.preventDefault();
                    errHandler(evt.error);
                });

                window.addEventListener("message", (evt) => {
                    try {
                        eval(evt.data)
                    } catch (error) {
                        errHandler(error);
                    }
                }, false)
            </script>
        </body>
        
        </html>`;
        iframeRef.current.srcdoc = htmlCode;
        // so iframe has enough time to listens for events/msgs
        setTimeout(() => {
            iframeRef.current?.contentWindow?.postMessage(code, '*');
        }, 200);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe ref={iframeRef} title="Preview" sandbox="allow-modals allow-forms allow-popups allow-scripts" style={{ backgroundColor: '#fff' }} />
            {bundleStatus && <div className="bundle-status-error"> <h6>Bundling Error:</h6> {bundleStatus} </div>}
        </div>
    )
}

export default Preview
