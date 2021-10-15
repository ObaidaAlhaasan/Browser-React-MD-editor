import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells'

export const serve = (port: number, fileName: string, dir: string, useProxy: boolean = false) => {
    const app = express();

    app.use(createCellsRouter(fileName, dir));

    if (useProxy) {
        app.use(createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'error'
        }));

    } else {
        const pkgPath = require.resolve("@s616/local-client/build/index.html");
        app.use(express.static(path.dirname(pkgPath)));
    }


    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    })

}