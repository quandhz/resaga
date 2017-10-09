# React Resaga
[![npm version](https://badge.fury.io/js/resaga.svg)](https://www.npmjs.com/package/resaga)
[![codecov](https://codecov.io/gh/quandhz/resaga/branch/master/graph/badge.svg)](https://codecov.io/gh/QuanDhz/resaga)
[![Build Status](https://travis-ci.org/quandhz/resaga.svg?branch=master)](https://travis-ci.org/QuanDhz/resaga)
[![Dependency Status](https://gemnasium.com/badges/github.com/quandhz/resaga.svg)](https://gemnasium.com/github.com/quandhz/resaga)

A reusable Reducer and Saga HOC library

### Documentation
https://resaga.quandh.com

### Install

```bash
npm install --save resaga
```

## Basic Usages
### Wrap your component by resaga HOC
```js
// MyBookPage.js
export class MyBookPage extends PureComponent {
  // ...
}

const configs = {
  name: 'MyBookPage',
  requests: {
    getBooks: () => fetch('get', '/api/books'),
  },
};
export default resaga(configs)(MyBookPage);
```
- `configs.name`: unique, work as an identification
- `requests.getBooks`: tell resaga what to do when 'getBooks' is dispatched
- `resaga(configs)(MyBookPage)` wrap MyBookPage by resaga HOC with your own configs

### Use the injected props
Props `resaga` will be attached to `MyBookPage` component
```js
// MyBookPage.js
componentDidMount = () => this.props.resaga.dispatch('getBooks');
componentWillReceiveProps = (nextProps) =>
  this.props.resaga.analyse(
    nextProps,
    { getBooks: { onSuccess: this.getBooksSuccess } }
  );
getBooksSuccess = (books) => {
  // will be called when server returns some results
}
```

### Inject resaga reducer and sagas to your route
This is based on reactboilerplate `routes.js` file
```js
const myBookPage = 'MyBookPage'; // should match `configs.page` that we set in the beginning
<Route
  path={'/books'}
  name={'My Book Page'}
  getComponent={(nextState, cb) => {
    const importModules = Promise.all([
      import('resaga'),
      import('containers/MyBookPage'),
    ]);

    const renderRoute = loadModule(cb);
    
    importModules.then(([resaga, component]) => {
      const reducer = resaga.reducer(myBookPage);
      injectReducer(myBookPage, reducer);
      injectSagas(resaga.sagas);
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  }}
/>
```

## Tests!
Run them:
`npm run test:jest`

Check coverage:
`npm run coverage`

## Scripts
Run with `npm run <script>`.

### release
Takes the same argument as `npm publish`, i.e. `[major|minor|patch|x.x.x]`, then tags a new version, publishes, and pushes the version commit and tag to `origin/master`. Usage: `npm run release -- [major|minor|patch|x.x.x]`. Remember to update the CHANGELOG before releasing!

### build
Runs the build scripts detailed below.

### build:component
Transpiles the source in `lib/` and outputs it to `build/`, as well as creating a UMD bundle in `dist/`.

### test
Runs the test scripts detailed below.

### test:lint
Runs `eslint` on the source.

### test:jest
Runs the unit tests with `jest`.

### coverage
Runs the unit tests and creates a code coverage report.
