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

(function() {
	'use strict';

	// MOVING SUM //

    /**
	* FUNCTION: msum( arr , window )
	*	Computes a moving sum over an array of values.
	*
	* @param {Array} arr - array of data values
	* @param {Number} window - size of moving window
	* @returns {Array} array of window sum values
	*/
	function msum( arr , W ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'msum()::invalid input argument. Must provide an array.' );
		}
		if ( typeof W !== 'number' || W !== W ) {
            throw new TypeError( 'msum()::invalid input argument. Window must be numeric.' );
        }
        if ( Math.floor( W ) !== W || W < 1 ) {
            throw new TypeError( 'msum()::invalid input argument. Window must be a positive integer.' );
        }
		if ( W > arr.length ) {
			throw new Error( 'msum()::invalid input argument. Window cannot exceed the array length.' );
		}
		var len = arr.length,
			out = new Array( len - W + 1 ),
			sum = 0,
			k;

		// Compute the sum for the first window...
		for ( var i = 0; i < W; i++ ) {
			sum += arr[ i ];
		}
		out[ 0 ] = sum;

		// Compute the sum for the remaining windows...
		for ( var j = W; j < len; j++ ) {
			k = j - W;
			sum += arr[ j ] - arr[ k ];
			out[ k+1 ] = sum;
		}
		return out;
	} // end FUNCTION msum()


	// EXPORTS //

	module.exports = msum;

})();