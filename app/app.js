/**
 * Application view engine entry point
 */
import express from 'express';
import fs from 'fs';
import path from 'path';
import sass from 'node-sass';

const [
    {
        createReadStream: readStream,
        readFileSync: read,
        writeFileSync: write,
        readdirSync: readDir
    },
    {
        join,
        resolve
    } ] = [ fs, path ],
    app = express.Router(),
    staticFiles = 'public/',
    indexFile = join( staticFiles, 'index.html' ),
    globalStyleSheet = join( staticFiles, 'style/global.css' ),
    seoFiles = join( staticFiles, 'seo' ),
    scrFiles = join( staticFiles, 'js' ),
    indexMime = 'text/html',
    sMime = 'text/javascript',
    icons = join( staticFiles, 'style/fa/icons.css' ),
    faFontFiles = join( staticFiles, 'style/fa' );

/**
 * @function static shorthand function for the express static function
 * @description TODO:
 */
function serveStatic ( staticContentPath ) {
    return express.static( join( __dirname, staticContentPath ) );
};

/**
 * @function streamResource
 * @description Stream resources requested by front end
 */
function streamResource ( resourcePath, mime, responseObject ) {
    try {
        readStream( join( __dirname, resourcePath ) )
            .pipe( responseObject.set( mime ).status( 200 ) );
    } catch ( err ) {
        console.error( err );
        responseObject.status( 500 ).send( { message: err.message, stack: err.stack } );
    }
};
/**
 * @function sassFile
 * @description creates a css file from a scss file
 */
function sassFile ( file ) {
    const origin = join( __dirname, file );
    const { css } = sass.renderSync( { data: read( origin, 'utf8' ) } );
    return write( origin.replace( 'scss', 'css' ), css.toString(), 'utf8' );
}
/**
 * @function scriptBundle 
 * @description reads the public/js folder to see the latest hashed file
 */
function scriptBundle ( path ) {
    return join( path, readDir( resolve( __dirname, path ) )[ 0 ] );
}
/**
 * Resolve SASS files to css files
 */
sassFile( './public/style/global.scss' );
/**
 * @description Generic route to handle logging
 */
app.all( '*', ( { path, query, body }, { statusCode }, next ) => {
    console.log( 'query: ', query );
    console.log( 'body', body );
    console.log( statusCode, ' PATH: ', path, query && `QUERY: ${ JSON.stringify( query ) }` );
    console.log( statusCode, ' PATH: ', path );
    next();
} );
/**
 * @description application static routes
 */
app.use( serveStatic( staticFiles ) );

app.use( '/fa', serveStatic( faFontFiles ) );

app.use( '/icons', serveStatic( icons ) );

app.use( '/seo', serveStatic( seoFiles ) );

app.use( '/global-stylesheet', serveStatic( globalStyleSheet ) );

/**
 * @description Application end points
 */

app.get( '/bundle', ( req, res ) => streamResource( scriptBundle( scrFiles ), sMime, res ) );

app.post( '/username', ( req, res ) => {
    console.log( req.body );
    res.send( 'posted bitch' );
} );

export default app;