"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SvelteSource_1 = __importDefault(require("../base/SvelteSource"));
const Import_1 = __importDefault(require("../imports/Import"));
const NamespaceImport_1 = __importDefault(require("../imports/NamespaceImport"));
const DefaultImport_1 = __importDefault(require("../imports/DefaultImport"));
const UsagePartial_1 = __importDefault(require("../partials/UsagePartial"));
const MainPartial_1 = __importDefault(require("../partials/MainPartial"));
const importsMap = {
    ImportSpecifier: Import_1.default,
    ImportDefaultSpecifier: DefaultImport_1.default,
    ImportNamespaceSpecifier: NamespaceImport_1.default
};
class Documentation extends SvelteSource_1.default {
    get title() {
        if (!this.main) {
            return undefined;
        }
        return this.main
            .getNativeAttributeAsString('title');
    }
    get main() {
        return Documentation.resolveTagNode(this, MainPartial_1.default);
    }
    get usages() {
        return Documentation.resolveTagNodes(this, UsagePartial_1.default);
    }
    get partials() {
        const partials = [];
        this.main && partials.push(this.main);
        return [...partials, ...this.usages];
    }
    apply(replacement) {
        const { variables, code } = replacement.generate();
        const prefix = this.source.substr(0, replacement.start);
        const suffix = this.source.substr(replacement.end);
        this.source = `${prefix}${code}${suffix}`;
        return variables;
    }
    define(variables) {
        const definitions = variables
            .map((variable) => `const ${variable.name} = ${JSON.stringify(variable.value)};`);
        this.source = this.source
            .replace(/(<script[^>]*>)/, `$1\n  ${definitions.join('\n  ')}`);
    }
    static findComponentByTagsInHtml(node, aliases) {
        if (!aliases.length) {
            return [];
        }
        if (node.type === 'InlineComponent' && aliases.includes(node.name)) {
            return [node];
        }
        if (node.children) {
            let nodes = [];
            for (const child of node.children) {
                nodes = [...nodes, ...Documentation.findComponentByTagsInHtml(child, aliases)];
            }
            return nodes;
        }
        return [];
    }
    static resolveTags(that, tree, name) {
        const namePath = name.split('.');
        const moduleTags = Documentation.resolveTagsFromScript(that, tree.module, namePath);
        const instanceTags = Documentation.resolveTagsFromScript(that, tree.instance, namePath);
        return [...moduleTags, ...instanceTags];
    }
    static resolveTagsFromScript(that, script, namePath) {
        const importDeclarations = this.resolveRelativeImportsFromScript(script);
        const selfImportDeclarations = importDeclarations.filter((node) => node.source.value === that.name);
        let tags = [];
        for (const selfImportDeclaration of selfImportDeclarations) {
            for (const specifier of selfImportDeclaration.specifiers) {
                const model = importsMap[specifier.type];
                const instance = new model({ script, specifier: specifier });
                tags = [...tags, ...instance.resolveTags(namePath)];
            }
        }
        return tags;
    }
    static resolveRelativeImportsFromScript(script) {
        if (!script) {
            return [];
        }
        return script.content.body.filter((node) => node.type === 'ImportDeclaration');
    }
    static resolveTagNodes(documentation, partial) {
        const tags = Documentation.resolveTags(documentation.package, documentation.tree, partial.alias);
        const nodes = Documentation.findComponentByTagsInHtml(documentation.tree.html, tags);
        return nodes.map((node) => new partial({ path: documentation.path, node, documentation: documentation }));
    }
    static resolveTagNode(documentation, partial) {
        const partials = Documentation.resolveTagNodes(documentation, partial);
        if (partials.length > 1) {
            throw new Error(`There should be only one declaration component usage inside the documentation file (${documentation.path})`);
        }
        else if (!partials.length) {
            return undefined;
        }
        return partials[0];
    }
}
exports.default = Documentation;
