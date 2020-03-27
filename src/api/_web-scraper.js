/**
 * @name Web-scraper
 */


const http = require( 'https' );

const req = http.request( 'https://www.imdb.com/chart/top', ( res ) => {


    let data;

    res.on( 'data', chunk => data += chunk );

    res.on( 'end', () => {
        console.log( data );
        require( 'fs' ).writeFileSync( './test.html', data, 'utf8' );

        const s1 = data.search( '<table' );
        const s2 = data.search( '</table>' );
        console.log( 's1: ', s1 );
        console.log( 's2: ', s2 );
        const sub1 = data.substring( s1, s2 );
        require( 'fs' ).writeFileSync( './test-s.html', sub1, 'utf8' );
    } );
} );
req.end();
