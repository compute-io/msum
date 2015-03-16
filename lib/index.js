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

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isFunction = require( 'validate.io-function' );


// MOVING SUM //

/**
* FUNCTION: msum( arr, W[, options] )
*	Computes a moving sum over an array.
*
* @param {Array} arr - input array
* @param {Number} W - size of moving window
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array of window sums
* @returns {Array} array of window sum values
*/
function msum( arr, W, options ) {
	var copy = true,
		clbk,
		len,
		sum,
		dropVal,
		out,
		i;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'msum()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( !isPositiveInteger( W ) ) {
        throw new TypeError( 'msum()::invalid input argument. Window must be a positive integer. Value: `' + W + '`.' );
    }
	if ( arguments.length > 2 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'msum()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}
		if ( options.hasOwnProperty( 'accessor' ) ) {
			clbk = options.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'msum()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( options.hasOwnProperty( 'copy' ) ) {
			copy = options.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'msum()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}
	if ( W > arr.length ) {
		throw new Error( 'msum()::invalid input argument. Window cannot exceed the array length.' );
	}
	len = arr.length;
	sum = 0;

	if ( copy && !clbk ) {
		// Case 1: numeric array and return a copy...
		len = len - W + 1;
		out = new Array( len );

		// Calculate the sum for the first window...
		for ( i = 0; i < W; i++ ) {
			sum += arr[ i ];
		}
		out[ 0 ] = sum;

		// Calculate sums for the remaining windows...
		for ( i = 0; i < len-1; i++ ){
			sum += arr[ i+W ] - arr[ i ];
			out[ i+1 ] = sum;
		}
		return out;
	}
	else if ( clbk ) {
		if ( copy ) {
			// Case 2: non-numeric array and return a copy...
			out = new Array( len );
			for ( i = 0; i < len; i++ ){
				out[ i ] = clbk( arr[i] );
			}
		} else {
			// Case 3: non-numeric array and mutate the input array...
			out = arr;
			for ( i = 0; i < len; i++ ) {
				out[ i ] = clbk( arr[i] );
			}
		}
	}
	else {
		// Case 4: numeric array and mutate the input array...
		out = arr;
	}
	len = len - W + 1;

	// Calculate the sum for the first window...
	for ( i = 0; i < W; i++ ) {
		sum += out[ i ];
	}
	dropVal = out[ 0 ];
	out[ 0 ] = sum;

	// Calculate sums for the remaining windows...
	for ( i = 1; i < len; i++ ){
		sum += out[ i+W-1 ] - dropVal;
		dropVal = out[ i ];
		out[ i ] = sum;
	}
	// Trim the output array:
	out.length = len;
	return out;
} // end FUNCTION msum()


// EXPORTS //

module.exports = msum;

