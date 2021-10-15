#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var serve_1 = __importDefault(require("./commands/serve"));
commander_1.program.addCommand(serve_1.default);
commander_1.program.parse(process.argv);
