/**
 * Browser layout
 */

const testEl = document.createElement( 'div' );

testEl.innerHTML = '<h1>TESTING<h1>'

const main = document.getElementsByTagName( 'main' )[ 0 ];
console.log( 'main: ', main );
main.appendChild( testEl );


// .appendChild( testEl );

