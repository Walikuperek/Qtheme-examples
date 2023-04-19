# Qtheme

![QthemeLogo](https://quak.com.pl/assets/logo/qtheme_Background_Removed.png)
![LicenseBadge](https://img.shields.io/github/license/walikuperek/qtheme)
![TestsBadge](https://img.shields.io/badge/Tests-7%2F7%20%E2%9C%85-success)

* [Website & Docs & DEMO](https://quak.com.pl/lib/qtheme/index.html)
* [GitHub repository](https://github.com/Walikuperek/Qtheme)
* [NPM package](https://www.npmjs.com/package/@quak.lib/qtheme)
* [Examples repository](https://github.com/Walikuperek/Qtheme-examples)

~7kb.js, simple, fast and production-ready *css-in-js* library for managing themes in your app. Create multiple themes and switch between them with **`Qtheme.setTheme(theme)`**

Tested in **Svelte**, **Angular**, **React**. Will work with any framework/library. Below examples.

> Will work with **vanilla JS** if supports import/export
> 
> Try [vitejs.dev](https://vitejs.dev/) to use powerful import/export in vanilla JS

## Requirements
None, works with any framework and plain JS/TS with HTML.

## Install
```bash
npm install @quak.lib/qtheme
```

## Getting started
Qtheme lets you:
* Create infinite number of themes
* Switch between them easily
* Set common theme atoms for all themes
* Initialize already chosen theme on app start
* Generate CSS classes for you, so you don't have to write it by yourself

Continue getting started at [Qtheme Docs - Getting started](https://quak.com.pl/lib/qtheme/docs/getting-started.html)

## API

You will find all information about Qtheme theming API in [Qtheme Docs - API](https://quak.com.pl/lib/qtheme/docs/api.html)


## Qtheme - Table of Contents

* [Overview](#overview)
* [Basic usage](#basic-usage)
* [Advanced usage](#advanced-usage)
* [Examples](#examples)
  - [Vanilla](#vanilla)
    * [Javascript + HTML](#javascript--html)
    * [Typescript + HTML](#typescript--html)
  - [Framework/library](#frameworklibrary)
    * [Svelte](#svelte)
    * [Angular](#angular)
    * [React](#react)
* [License](#license)


## Overview
Qtheme is based on `theme atoms`

Atom is a single theme element concept. It consists of **name** and **value**. Name is a string, value is a string or object.

```typescript
import { ThemeAtom } from '@quak.lib/qtheme'

const themeAtoms: ThemeAtom[] = [
  ['bg', '#333']
  ['bg', 'background:#333'],
  ['bg', { 'background': '#333' }],
  ['bg:hover', { 'background': '#333' }],
  ['bg::after:hover', { 'content': 'Hello world!'; 'color': 'white', 'background': '#333' }]
]
```

You can use atoms to create **compound CSS styles**. For example, you can create a button with `btn` atom and `btn-primary` atom. `btn-primary` will inherit all styles from `btn` atom and add some additional styles.

```tsx
import { Theme } from '@quak.lib/qtheme'
import { themeAtoms } from './path/to/your/themeAtoms'
import { Qtheme } from "./qtheme";

const btn = {
  'font-size': '1rem',
  'color': 'var(--primary)',
  'background-color': 'var(--primary-inner)',
  'padding': '0.5rem 1rem',
  'border': '1.5px solid var(--primary)',
  'outline-color': 'var(--primary-focus)',
  'border-radius': '0.25rem',
};
const btnPrimary = {
  ...btn,
  'background-color': 'var(--primary-focus)',
  'color': 'var(--primary-content)'
}
const btnHover = {
  'background-color': 'var(--primary)',
  'color': 'var(--primary-content)',
  'cursor': 'pointer'
};
const btnActive = {
  'border-style': 'inset',
  'border-width': '1.5px',
}

const commonAtoms: ThemeAtom[] = [
  ['btn', btn],
  ['btn:hover', btnHover],
  ['btn:active', btnActive],
  ['btn-primary', btnPrimary],
  ['btn-primary:hover', btnHover],
  ['btn-primary:active', btnActive],
]

const exampleDarkTheme: Theme = {
  name: 'dark',
  atoms: [...themeAtoms, ...commonAtoms]
}

Qtheme.setTheme(exampleDarkTheme);
// if no need to override commonAtoms between themes, you can use
Qtheme.setCommonAtoms(commonAtoms)
// or at the start of your app
Qtheme.init(defaultTheme, commonAtoms)
```

```html
<!-- Use like-->
<button class="btn">Button</button>
<button class="btn-primary">Primary Button</button>
```

## Basic usage
Basic usage example to show you how to use Qtheme. You can find more examples(JS/TS/React/Angular/Svelte) in [Qtheme Examples](https://github.com/Walikuperek/Qtheme-examples)

```typescript
import {Qtheme, Theme} from '@quak.lib/qtheme'

const darkTheme: Theme = {
  name: 'dark',
  atoms: [
      ['primary', 'dodgerblue'],
      
      ['bg-color', 'background-color:hsl(0, 100%, 0%)'],
      ['text-color', 'color:#fff'],
      ['text-primary', 'color:var(--primary)']
  ] 
};
const lightTheme: Theme = {
  name: 'light',
  atoms: [
      ['primary', 'dodgerblue'],
      
      ['bg-color', 'background-color:hsl(0, 0%, 100%)'],
      ['text-color', 'color:black'],
      ['text-primary', 'color:var(--primary)']
  ] 
};

// Init theme on app start * will load from local storage if exists
Qtheme.init(darkTheme);

// Change theme
Qtheme.setTheme(lightTheme);
```

```html
<div class="bg-color">
  <h1 class="text-primary">Hello world!</h1>
  <p class="text-color">This is regular text color</p>
</div>
```

## Advanced usage
Example of advanced usage with **compound CSS styles**.

Create some buttons

```html
<button class="btn">Button</button>
<button class="btn-primary">Primary Button</button>
```

Declare theme
```typescript
import { Theme, ThemeAtom } from '@quak.lib/qtheme'

const darkTheme: Theme = {
    name: 'dark',
    atoms: [
      ['primary', 'hsl(263, 66%, 63%)'], // purple
      ['primary-inner', 'hsl(263, 66%, 20%)'],
      ['primary-focus', 'hsl(263, 66%, 40%)'],
      ['primary-content', 'white'],
    ]
};
```

Style buttons
```typescript
const btn = {
    'font-size': '1rem',
    'padding': '0.5rem 1rem',
    'color': 'var(--primary)',
    'border': '1.5px solid var(--primary)',
    'border-radius': '0.25rem',
    'background-color': 'var(--primary-inner)',
    'outline-color': 'var(--primary-focus)',
};
const btnPrimary = {
    ...btn,
    'background-color': 'var(--primary-focus)',
    'color': 'var(--primary-content)'
}
```
Add some states for buttons
```typescript
const btnHover = {
    'background-color': 'var(--primary)',
    'color': 'var(--primary-content)',
    'cursor': 'pointer'
};
const btnActive = {
    'border-style': 'inset'
}

```
Declare common atoms
```typescript
import { ThemeAtom } from '@quak.lib/qtheme'

const commonThemeAtoms: ThemeAtom[] = [
    ['btn', btn],
    ['btn:hover', btnHover],
    ['btn:active', btnActive],
    ['btn-primary', btnPrimary],
    ['btn-primary:hover', btnHover],
    ['btn-primary:active', btnActive],
]
```
Set theme
```typescript
import { Qtheme } from '@quak.lib/qtheme'
import { lightTheme, darkTheme, commonThemeAtoms } from '/path/to/your/themes'

// will load from local storage if exists
Qtheme.init(darkTheme, { commonAtoms: commonThemeAtoms })
// or
Qtheme.setTheme(darkTheme)
Qtheme.setCommonAtoms(commonAtoms)

// Change theme to see the difference
Qtheme.setTheme(lightTheme)
```

## Examples
**Qtheme** is agnostic to any framework/library. You can use it with any of them.

Examples are located in [GitHub Qtheme-examples](https://github.com/Walikuperek/Qtheme-examples) repository.

- [Vanilla](#vanilla)
  * [Javascript + HTML](#javascript--html)
  * [Typescript + HTML](#typescript--html)
- [Framework/library](#frameworklibrary)
  * [Svelte](#svelte)
  * [Angular](#angular)
  * [React](#react)

### Vanilla
Try Qtheme with vanilla JS/TS and HTML.
#### Javascript + HTML
[GitHub vanilla JS usage example](https://github.com/Walikuperek/Qtheme-examples/tree/master/vanilla)

Brief example:
```javascript
import {Qtheme} from '@quak.lib/qtheme'
import {darkTheme} from 'path/to/your/themes'

const savedTheme = Qtheme.getTheme();
if (savedTheme) {
  Qtheme.setTheme(savedTheme);
} else {
  // Set some default theme
  Qtheme.setTheme(darkTheme);
}
```
```html
<div class="bg-color">
  <h1 class="text-primary">Hello world!</h1>
  <p class="text-color">This is regular text color</p>
</div>
```


#### Typescript + HTML
[GitHub Typescript usage example](https://github.com/Walikuperek/Qtheme-examples/tree/master/typescript)

Brief example:
```typescript
import {Qtheme, Theme} from '@quak.lib/qtheme'
import {darkTheme} from 'path/to/your/themes'

const savedTheme: Theme | null  = Qtheme.getTheme();
if (savedTheme) {
  Qtheme.setTheme(savedTheme);
} else {
  // Set some default theme
  Qtheme.setTheme(darkTheme);
}
```
```html
<div class="bg-color">
  <h1 class="text-primary">Hello world!</h1>
  <p class="text-color">This is regular text color</p>
</div>
```

### Framework/library
**Qtheme** works with **any** framework/library. You can use it with Angular, React, Svelte, Vue, etc.

#### Angular
[GitHub Angular usage example](https://github.com/Walikuperek/Qtheme-examples/tree/master/angular)

Brief example:
```typescript
import {Qtheme, Theme} from '@quak.lib/qtheme'
import {darkTheme} from 'path/to/your/themes'

class AppComponent {
  constructor() {
    const savedTheme: Theme | null = Qtheme.getTheme();
    if (savedTheme) {
      Qtheme.setTheme(savedTheme);
    } else {
      // Set some default theme
      Qtheme.setTheme(darkTheme);
    }
  }
}
```
```html
<div class="bg-color">
  <h1 class="text-primary">Hello world!</h1>
  <p class="text-color">This is regular text color</p>
</div>
```

#### React
[GitHub React usage example](https://github.com/Walikuperek/Qtheme-examples/tree/master/react)

Brief example:
```tsx
import {Qtheme} from '@quak.lib/qtheme'
import {darkTheme} from 'path/to/your/themes'

const App = () => {
  useEffect(() => {
    const savedTheme = Qtheme.getTheme();
    if (savedTheme) {
      Qtheme.setTheme(savedTheme);
    } else {
      // Set some default theme
      Qtheme.setTheme(darkTheme);
    }
  }, []);
  
  return (
    <div className="bg-color">
      <h1 className="text-primary">Hello world!</h1>
      <p className="text-color">This is regular text color</p>
    </div>
  );
}
```


#### Svelte
[GitHub Svelte usage example](https://github.com/Walikuperek/Qtheme-examples/tree/master/svelte)

Brief example:
```html
<script>
  import {Qtheme} from '@quak.lib/qtheme'
  import {darkTheme} from 'path/to/your/themes'
  
  const savedTheme = Qtheme.getTheme();
  if (savedTheme) {
    Qtheme.setTheme(savedTheme);
  } else {
    // Set some default theme
    Qtheme.setTheme(darkTheme);
  }
</script>

<div class="bg-color">
  <h1 class="text-primary">Hello world!</h1>
  <p class="text-color">This is regular text color</p>
</div>
```

## License

[MIT LICENSE](https://github.com/Walikuperek/Qtheme/blob/master/LICENSE)

Made & maintained with ❤️ by [QUAK](https://quak.com.pl)
