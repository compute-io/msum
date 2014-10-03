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
    * FUNCTION: getArray(W)
    *   Returns an array pre-initialized to 0.
    * 
    * @private
    * @param {Number} x - array size
    * @returns {Array} array
    */
    function getArray(x) {
        var array = new Array(x);
        for (var i = 0; i < x; i++) {
            array[i] = 0;
        }
        return array;
    } // end FUNCTION getArray()

	/**
	* FUNCTION: msum( arr , window )
	*	Computes the sum over an array of values.
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
        if ( Math.floor( window ) !== window ) {
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
			lenOut = arr.length - W + 1,
			outArr = getArray(lenOut),
			winSum = 0;

		for ( var i = 0; i < W; i++ ) {
			winSum += arr[i];
			}

		outArr[0] = winSum;

		for ( var i = W; i < lenIn; i++ ) {
			winSum = winSum - arr[i-W] + arr[i];
			outArr[i-W+1] = winSum;
			}		

		return outArr;
	} // end FUNCTION msum()


	// EXPORTS //

	module.exports = msum;

})();