/**
*
*	COMPUTE: msum
*
*
*	DESCRIPTION:
*		- Compute a moving sum over a numeric array.
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

// MOVING SUM //

/**
* FUNCTION: msum( arr , W , clbk )
*	Computes a moving sum over an array of numeric values.
*
* @param {Array} arr - array of data values
* @param {Number} W - size of moving window
* @param {Function} [accessor] - function for accessing array values
* @returns {Array} array of window sum values
*/
function msum( arr , W , clbk ) {

	if ( !isArray( arr ) ) {
		throw new TypeError( 'prod()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( typeof clbk !== 'function' ) {
			throw new TypeError( 'prod()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}
	if ( W > arr.length ) {
		throw new Error( 'msum()::invalid input argument. Window cannot exceed the array length.' );
	}

	// Todo: Swap in validate module to check +ve integer
	if ( typeof W !== 'number' || W !== W ) {
        throw new TypeError( 'msum()::invalid input argument. Window must be numeric.' );
    }
    if ( Math.floor( W ) !== W || W < 1 ) {
        throw new TypeError( 'msum()::invalid input argument. Window must be a positive integer.' );
    }

	var len = arr.length,
		out = new Array ( len ),
		sum = 0,
		valtodrop = 0;

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
	valtodrop = out[ 0 ];
	out[ 0 ] = sum;

	// Calculate later sums
	for ( var i = 1; i < len - W + 1; i++ ){
		sum += out[ i + W - 1 ] - valtodrop;
		valtodrop = out[ i ];
		out[ i ] = sum;
	} 

	out.splice( len - W + 1 , W - 1 );

	return out;

} // end FUNCTION msum()


// EXPORTS //

module.exports = msum;

