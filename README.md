# Nnsdao Kit

## Install

### Local dev,install latest

Tag `#dev` must provide

```sh
npm i https://github.com/NnsDao/nnsdao-kit.git#dev
```

### Online prod

#### Install from Github

```sh
npm i https://github.com/NnsDao/nnsdao-kit.git
```

#### Install from npm

Config registry

```txt
# .npmrc
@nnsdao:registry=https://registry.npmjs.org/
```

```sh
npm install @nnsdao/nnsdao-kit
```

#### Install from Github packages

Config registry

```txt
# .npmrc
@nnsdao:registry=https://npm.pkg.github.com
```

```sh
npm install @nnsdao/nnsdao-kit
```

## Usage

### Connect Plug && Stoic

<details close>
<summary>details</summary>
 
```js
// React Hooks
const verifyConnection = async () => {
  const connected = await window.ic.plug.isConnected();
  if (!connected) await window.ic.plug.requestConnect({ whitelist, host });
};

useEffect(async () => {
verifyConnection();
}, []);

````
</details>


### Import Actor,Actor Instance Type
```js
import { idlFactory } from '@nnsdao/nnsdao-kit/market/index';
import type { _SERVICE } from '@nnsdao/nnsdao-kit/market/types';
````

## Config Typescript Path Alias

Config Path alias at `tsconfig.json`

```json
{
  "compilerOptions": {
    // xxx
    "paths": {
      "@nnsdao/nnsdao-kit/*": ["./node_modules/@nnsdao/nnsdao-kit/src/*"]
      // WARNING
      // if you already have @** config ,then @nnsdao must place before @/*
      // such as
      // "@nnsdao/nnsdao-kit/*": ["./node_modules/@nnsdao/nnsdao-kit/src/*"],
      // "@/*": ["./src/*"],
    }
  }
}
```

TODO

1. auto download candid ,binding to another language,update local file
