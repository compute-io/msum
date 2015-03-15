/**
*
*	COMPUTE: msum
*
*
*	DESCRIPTION:
*		- Compute a moving sum over an array.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );
var isNumber = require( 'validate.io-number' );
var isPositiveInteger = require( 'validate.io-positive-integer' );
var isFunction = require( 'validate.io-function' );

// MOVING SUM //

/**
* FUNCTION: msum( arr , W , clbk )
*	Computes a moving sum over an array.
*
* @param {Array} arr - array of data values
* @param {Number} W - size of moving window
* @param {Function} [accessor] - function for accessing numeric array values
* @returns {Array} array of window sum values
*/
function msum( arr , W , clbk ) {

	if ( !isArray( arr ) ) {
		throw new TypeError( 'prod()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( !isNumber( W ) ) {
        throw new TypeError( 'msum()::invalid input argument. Window must be numeric.' );
    }
	if ( !isPositiveInteger( W ) ) {
        throw new TypeError( 'msum()::invalid input argument. Window must be a positive integer.' );
    }
	if ( arguments.length > 2 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'prod()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}
	if ( W > arr.length ) {
		throw new Error( 'msum()::invalid input argument. Window cannot exceed the array length.' );
	}

	var len = arr.length,
		out = new Array ( len ),
		sum = 0,
		drop = 0;

	//Fill output array with input values
	if ( clbk ) {
		for (i = 0; i < len; i++ ){
			out[i] = clbk ( arr[i] );
		}
	} else {
		for (i = 0; i < len; i++ ){
			out[i] = arr[i];
		}
	}

	// Calculate moving sums
	// First window
	for ( var i = 0; i < W; i++ ) {
		sum += out[ i ];
	}
	drop = out[ 0 ];
	out[ 0 ] = sum;

	// Later windows
	for ( var i = 1; i < len - W + 1; i++ ){
		sum += out[ i + W - 1 ] - drop;
		drop = out[ i ];
		out[ i ] = sum;
	} 

	// Trim output array
	out.splice( len - W + 1 , W - 1 );

	return out;

} // end FUNCTION msum()


// EXPORTS //

module.exports = msum;

