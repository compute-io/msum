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
				msum( value , 3 );
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
				msum( [] , value );
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
				msum( [1,2,3,4,5], 2, value );
			};
		}
	});

	it( 'should compute a moving sum', function test() {
		var data, actual, expected, W;

		// Define a window size:
		W = 3;

		// Simulate some data:
		data = [ 2, 4, 4, 6, 2, 3, 5, 1, 5, 3, 7, 5 ];

		// Expected values:
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

		expected = [ 6 , 9 , 12 , 15 ];

		actual = msum( data, W, getValue );

		assert.strictEqual( actual.length, data.length-W+1 );
		assert.deepEqual( actual, expected );
	});

});