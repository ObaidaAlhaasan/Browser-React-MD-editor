import { fetchPlugin } from './plugins/fetch';
import { unpkgPathPlugin } from './plugins/unpkgPathPlugin';
import * as esBuild from 'esbuild-wasm'

let service: esBuild.Service;
const bundler = async (rawCode: string) => {
    if (!service) {
        service = await esBuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        });
    }

    const result = await service.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
            'process.env.NODE_ENV': '"produciton"',
            global: 'window'
        }
    });

    return result.outputFiles[0].text;
};

export default bundler;