"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const resolvePackagePath_1 = __importDefault(require("./helpers/resolvePackagePath"));
exports.PATH_ROOT = resolvePackagePath_1.default(__dirname);
exports.PATH_TEMPLATE = path.resolve(exports.PATH_ROOT, 'template');
exports.DOCUMENTATION_PATH_SUFFIX = 'Documentation';
exports.DOCUMENTATION_PATH_EXTENSION = 'svelte';
exports.WATCH_DELAY = 1000;
exports.WATCH_TEMPLATES = [
    `/**/*${exports.DOCUMENTATION_PATH_SUFFIX}`,
    `/**/*${exports.DOCUMENTATION_PATH_SUFFIX}.${exports.DOCUMENTATION_PATH_EXTENSION}`
];
