Both function stored in [watchers.js](src/functions/watchers.js) file.

Initially they are included in [index.js](src/index.js) that extends window with corresponding 
`urCapture` namespace

Here used webpack module bundler but this is unnecessary.

To install 
```
yarn install
```
To compile in development mode with source maps and watching code updates use 
```
npx webpack --watch
```
for production (minified without source maps)
```
npx webpack
```
compiled version resides in [main.js](dist/main.js)
