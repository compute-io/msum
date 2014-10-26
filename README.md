Moving Sum
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes a moving sum over a numeric array.


## Installation

``` bash
$ npm install compute-msum
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var msum = require( 'compute-msum' );
```

#### msum( arr, window )

Slides a `window` over a numeric `array` to compute a moving sum.

``` javascript
var data = [ 1, 2, 3, 4, 5 ];

msum( data, 2 );
// returns [ 3, 5, 7, 9 ]
```

Note: the returned `array` has length `L - W + 1`, where `L` is the length of the input `array` and `W` is the `window` size. 


## Examples

``` javascript
var msum = require( 'compute-msum' );

// Simulate some data...
var data = new Array( 50 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

// Compute the moving sum:
var arr = msum( data, 7 );

console.log( arr.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.


[npm-image]: http://img.shields.io/npm/v/compute-msum.svg
[npm-url]: https://npmjs.org/package/compute-msum

[travis-image]: http://img.shields.io/travis/compute-io/msum/master.svg
[travis-url]: https://travis-ci.org/compute-io/msum

[coveralls-image]: https://img.shields.io/coveralls/compute-io/msum/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/msum?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/msum.svg
[dependencies-url]: https://david-dm.org/compute-io/msum

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/msum.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/msum

[github-issues-image]: http://img.shields.io/github/issues/compute-io/msum.svg
[github-issues-url]: https://github.com/compute-io/msum/issues