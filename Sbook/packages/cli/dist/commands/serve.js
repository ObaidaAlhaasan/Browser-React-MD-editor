"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var local_api_1 = require("local-api");
var posix_1 = __importDefault(require("path/posix"));
var ServeCommand = new commander_1.Command()
    .command("serve [fileName]")
    .description("Open a file to edit")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(function (fileName, options) {
    if (fileName === void 0) { fileName = "notebook.js"; }
    var dir = posix_1.default.join(process.cwd(), posix_1.default.dirname(fileName));
    (0, local_api_1.serve)(options.port, posix_1.default.basename(fileName), dir);
});
exports.default = ServeCommand;
