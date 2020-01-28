import * as path from 'path';
import resolvePackagePath from './helpers/resolvePackagePath';

export const PATH_ROOT = resolvePackagePath(__dirname);
export const PATH_TEMPLATE = path.resolve(PATH_ROOT, 'template');

export const DOCUMENTATION_PATH_SUFFIX = 'Documentation';
export const DOCUMENTATION_PATH_EXTENSION = 'svelte';
export const DOCUMENTATION_VARIABLE_INITIALIZATION = 'initialization';

export const WATCH_DELAY = 1000;
export const WATCH_TEMPLATES = ['/**/*'];
