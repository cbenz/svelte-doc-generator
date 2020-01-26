"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
function resolveRelativeImports(source, originalPath, targetPath) {
    const { dir: originalDir } = path.parse(originalPath);
    const { dir: targetDir } = path.parse(targetPath);
    const relative = path.relative(targetDir, originalDir);
    const relativeDir = path.dirname(relative);
    return source
        .replace(/(from\s*["'])(\.\/)/g, `$1${relative}/`)
        .replace(/(from\s*["'])(\.\.\/)/g, `$1${relativeDir}/`);
}
exports.default = resolveRelativeImports;
