
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
	'use strict';

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

	it( 'should throw an error if not provided a positive, numeric, integer window size', function test() {
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

		var testdata = [3,5,6,8,7,5,4,3,2,5,6,7,8,5,4]

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				msum( testdata , value );
			};
		}

	});

	it( 'should compute the sum in the window', function test() {
		var data, expected;

		// Simulate some data
		data = [ 2, 4, 4, 6, 2, 3, 5, 1, 5, 3, 7, 5 ];

		// Expected values of sum in the moving window
		expected = [10 , 14, 12, 11, 10, 9, 11, 9, 15, 15];

		var testOut = msum ( data , 3 );

		for ( var i = 0; i < expected.length; i++ ) {
			assert.strictEqual( testOut[i], expected[i] );
		}
	});

}); // end test descriptions