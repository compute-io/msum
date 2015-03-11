var msum = require( './../lib' );

// Simulate some data...
/*var data = new Array( 50 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}*/

//var data = [1,2,3,4,5,6,7,8,9,10];

var data = [ [4,1], [5,2], [67,3], [43,4], [2,5], [45,6] ];

function getValue( d ){
	return d[1];
}

// Compute the moving sum:
var arr = msum( data, 3, getValue );

console.log( arr.join( '\n' ) );