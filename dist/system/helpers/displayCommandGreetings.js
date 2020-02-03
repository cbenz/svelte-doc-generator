"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
function displayCommandGreetings(cmd) {
    console.log(`[${colors_1.default.blue(cmd.name())}] ${cmd.description()}`);
}
exports.default = displayCommandGreetings;
;
