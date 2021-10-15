import { Command } from 'commander';
import { serve } from '@s616/local-api';
import path from 'path';

const isProduction = process.env.NODE_ENV === "production";

const ServeCommand = new Command()
    .command("serve [fileName]")
    .description("Open a file to edit")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(async (fileName = "notebook.js", options: { port: number }) => {
        const dir = path.join(process.cwd(), path.dirname(fileName));

        try {
            await serve(options.port, path.basename(fileName), dir, !isProduction);
            console.log(`Opened ${fileName}. Navigate to http://localhost:${options.port} to edit the file.`);

        } catch (e) {
            if (e.code === "EADDRINUSE")
                console.error("Port is in use try to run on a different port");
            else
                console.log(e.message);

            process.exit(1);
        }
    });

export default ServeCommand;