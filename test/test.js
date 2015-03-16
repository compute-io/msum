/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	msum = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-msum', function tests() {

	it( 'should export a function', function test() {
		expect( msum ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				msum( value, 3 );
			};
		}
	});

	it( 'should throw an error if not provided a window size which is a positive integer', function test() {
		var values = [
			'5',
			2.7,
			-3,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				msum( [], value );
			};
		}
	});

	it( 'should throw an error if the window size exceeds the array size', function test() {
		var data = [ 1, 2, 3 ];

		expect( foo ).to.throw( Error );

		function foo() {
			msum( data, data.length+1 );
		}
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				msum( [1,2,3,4,5], 2, value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				msum( [1,2,3,4,5], 2, {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				msum( [1,2,3,4,5], 2, {'copy': value} );
			};
		}
	});

	it( 'should compute a moving sum', function test() {
		var data, actual, expected, W;

		// Define a window size:
		W = 3;

		// Trivial case:
		data = [ 1, 1, 1 ];
		expected = [ 3 ];
		actual = msum( data, W );

		assert.deepEqual( actual, expected );

		// Extended case:
		data = [ 2, 4, 4, 6, 2, 3, 5, 1, 5, 3, 7, 5 ];

		expected = [ 10, 14, 12, 11, 10, 9, 11, 9, 15, 15 ];

		actual = msum( data , W );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute a moving sum using an accessor function', function test() {
		var data, actual, expected, W;

		W = 3;
		data = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4},
			{'x':5},
			{'x':6}
		];

		function getValue( d ) {
			return d.x;
		}

		expected = [ 6, 9, 12, 15 ];

		actual = msum( data, W, {'accessor': getValue} );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should not mutate the input array by default', function test() {
		var data, expected, actual;

		data = [ 1, 1, 1 ];
		expected = [ 3 ];

		actual = msum( data, 3 );
		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should compute a moving sum and mutate the input array', function test() {
		var data, expected, actual;

		data = [ 1, 1, 1 ];
		expected = [ 3 ];

		actual = msum( data, 3, {'copy':false} );
		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

	it( 'should compute a moving sum using an accessor and mutate the input array', function test() {
		var data, expected, actual;

		data = [
			[0,1],
			[1,1],
			[2,1]
		];
		expected = [ 3 ];

		function getValue( d ) {
			return d[ 1 ];
		}

		actual = msum( data, 3, {
			'copy': false,
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

});
