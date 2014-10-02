var msum = require( './../lib' );

//var data = [1,2,3,4,5,6,7,8,9,10];
var data = new Array( 50 );

for ( var i = 0; i < data.length; i++ ) {
	data[i] = Math.random() * 100;
}

// Give function array of data and desired window size
var outArr = msum( data, 7 );

for ( i = 0; i < outArr.length; i++) {
	console.log( outArr[i] );
}
