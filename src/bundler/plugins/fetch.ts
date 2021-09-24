import axios from 'axios'
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';


const fileStorage = localforage.createInstance({
    name: 'fileDb'
})

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup: (build: esbuild.PluginBuild) => {
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult = await fileStorage.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    return cachedResult;
                }
            });

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const escaped = data.replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");
                const contents = `
                const style = document.createElement("style");
                style.innerHTML = '${escaped}';
                document.head.appendChild(style);
                `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileStorage.setItem(args.path, result);

                return result;
            });

            build.onLoad({ filter: /^index\.js$/ }, async (args: any) => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });

            build.onLoad({ filter: /.*/ }, async (args: any): Promise<esbuild.OnLoadResult | null> => {
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileStorage.setItem(args.path, result);

                return result;
            });
        }
    }
}