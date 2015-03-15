'use strict';

var msum = require( './../lib' );

var data = new Array( 50 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

// Compute the moving sum:
var arr = msum( data, 8 );

console.log( arr.join( '\n' ) );