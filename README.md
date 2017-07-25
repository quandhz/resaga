# React Resaga [![codecov](https://codecov.io/gh/QuanDhz/resaga/branch/master/graph/badge.svg)](https://codecov.io/gh/QuanDhz/resaga) [![Build Status](https://travis-ci.org/QuanDhz/resaga.svg?branch=master)](https://travis-ci.org/QuanDhz/resaga)

A reusable Reducer and Saga HOC library

## Install

### npm

```bash
npm install --save resaga
```

## Usages
### Wrap your component by the HOC
```js
// MyBookPage.js
export class MyBookPage extends PureComponent {
  // ...
}

const configs = {
  page: 'MyBookPage',
  submit: {
    getBooks: () => fetch('get', '/api/books'),
  },
};
export default resaga(MyBookPage, configs);
```

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

## API
1. `resaga.dispatch`
```
handleSubmit = () => {
  this.props.resaga.dispatch(book, 'createBook');
};
```
your `configs` will look like this
```js
const configs = {
  page: 'MyBookPage',
  submit: {
    createBook: (book) => fetch('post', '/api/books', book),
  },
};
```
2. `resaga.analyse`: utility function, to be used in `componentWillReceiveProps`, using this function ensures that every submission only return value once
```
componentWillReceiveProps = (nextProps) => 
    this.props.resaga.analyse(nextProps, {
      'getBooks': { onSuccess: this.getBooksSuccess, onError: getBooksError },
      'createBook': this.createBookWillReceiveProps, // return both success and error
    }
);
```
First parameter is `nextProps`, second parameter is config object:
- `onSuccess`which function to be called when saga return success.
- `onError`: which function to be called when saga return error.
- `manuallyAcknowledge (default: false)`:  whether the HOC should automatically acknowledge (see below).
3. `resaga.acknowledge`: acknowledge by cleaning up redux data of a request
```
createBookWillReceiveProps = (...) => {
  this.props.resaga.acknowledge('createBook');
  ...
}
```
4. `resaga.cleanup`: clear the whole page in redux data store. By default, this will be automatically called on `componentWillUnmount` if `MANUALLY_CLEANUP` in CONFIG is not set to true (default: false).
```
// manually clean up
this.props.resaga.cleanup('MyBookPage');
```

## Tests!

Run them:
`npm test`

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
