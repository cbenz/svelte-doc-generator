# Svelte documentation generator tool
Do you have a library of svelte components?
You can generate a documentation for whole your library.
![example](./doc/example.png)

## Installation
**1. Install the package**

```bash
npm install --save-dev svelte-doc--generator
```

**2. Run setup tool**

This will create `webpack.config.js`, `package.json` and `site` folder inside your project.
You can just copy and paste this files into your project from [template folder](./template).
You you already have `package.json` or `webpack.config.js`, just yours with from template ones.
```bash
node ./node_modules/.bin/svelte-doc-generator setup --project .
```

**3. Create sample documentation component**

For every component you want to create document for you have to create `*Documentation.svelte` file inside the component folder.
Imagine that you have folder `./src/components/Input` with component `Input.svelte`.
Inside `./src/components/Input` folder you have to create `InputDocumentation.svelte` like this:

```html
<script>
  import { Component } from 'svelte-doc-generator';
  import Input from './Input.svelte';
</script>

<Component title="Input">
  <div slot="description">
    Component to draw inputs easily.
  </div>

  <div slot="usages">
    <Component.Usage title="Default state">
      <Input />
    </Component.Usage>
  </div>
</Component>
``` 

**4. Generate documentation library**

This will generate a library from your components.
This tool will include only components with `*Documentation.svelte` files inside.
```bash
node ./node_modules/.bin/svelte-doc-gnerator ./src/components --target ./site/library
```

**5. Run your documentation site**

This command will start `webpack dev server` to serve your site.
```bash
node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --mode development
```

**6. Open localhost**

Open `localhost:8080` in your browser and take a look at the result!
