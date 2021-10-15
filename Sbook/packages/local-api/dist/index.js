"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var serve = function (port, fileName, dir) {
    var app = (0, express_1.default)();
    app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'error'
    }));
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
