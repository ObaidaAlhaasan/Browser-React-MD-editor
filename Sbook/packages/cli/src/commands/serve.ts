import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path/posix';

const ServeCommand = new Command()
    .command("serve [fileName]")
    .description("Open a file to edit")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((fileName = "notebook.js", options: { port: number }) => {
        const dir = path.join(process.cwd(), path.dirname(fileName));
        serve(options.port, path.basename(fileName), dir);
    });

export default ServeCommand;