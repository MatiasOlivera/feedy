# Feedly

A collaborative feedback platform for share ideas and discuss a product or service.

[![Dependency Status](https://david-dm.org/MatiasOlivera/feedy/status.svg)](https://david-dm.org/MatiasOlivera/feedy)
[![devDependency Status](https://david-dm.org/MatiasOlivera/feedy/dev-status.svg)](https://david-dm.org/MatiasOlivera/feedy#info=devDependencies)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Dependency status

**Server**

[![Dependency Status](https://david-dm.org/MatiasOlivera/feedy/status.svg?path=server)](https://david-dm.org/MatiasOlivera/feedy?path=server)
[![devDependency Status](https://david-dm.org/MatiasOlivera/feedy/dev-status.svg?path=server)](https://david-dm.org/MatiasOlivera/feedy?path=server&type=dev)

## Installation

### Requirements

- Node.js >= 8
- MySQL 5

## Development

```js
// Create and configure a .env file (environment variables)
cp .env.example .env

// Install root dependencies
npm install

// Install remaining package dependencies and link local packages
lerna bootstrap --hoist

// Change the current directory to server
cd server

// Run API server in watch mode
npm run dev

// Open a new terminal
// Run the Typescript compiler in watch mode
npm run watch
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
