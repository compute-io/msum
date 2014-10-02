/**
*
*	COMPUTE: msum
*
*
*	DESCRIPTION:
*		- Compute the sum of values in window moving through a numeric array.
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

	/**
	* FUNCTION: msum( arr , window )
	*	Computes the harmonic mean over an array of values.
	*
	* @param {Array} arr - array of data values.
	* @param {Number} window - size of moving window.
	* @returns {Array} array of window sum values.
	*/
	function msum( arr , window ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'msum()::invalid input argument. Must provide an array.' );
		}
		if ( typeof window !== 'number' || window !== window) {
            throw new TypeError( 'msum()::invalid input argument. Window must be numeric.');
        }
        if ( window % 1 !== 0 ) {
            throw new TypeError( 'msum()::invalid input argument. Window must be an integer value.');
        }
		if ( window > arr.length ) {
			throw new TypeError( 'msum()::invalid input argument. Window must be <= array size.' );
		}
		if ( window <= 0 ) {
			throw new TypeError( 'msum()::invalid input argument. Window size must be > 0.' );
		}

		var lenIn = arr.length,
			W = window,
			sumArr = new Array(1),
			winSum = 0;

		for ( var i = 0; i < W; i++ ) {
			winSum += arr[i];
			}

		sumArr[0] = winSum;

		for ( var i = W; i < lenIn; i++ ) {
			winSum = winSum - arr[i-W] + arr[i];
			sumArr.push(winSum);
			}		

		return sumArr;
	} // end FUNCTION msum()


	// EXPORTS //

	module.exports = msum;

})();