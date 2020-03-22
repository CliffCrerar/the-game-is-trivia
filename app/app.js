/**
 * Application view engine entry point
 */
import express from 'express';
import fs from 'fs';
import path from 'path';
import sass from 'node-sass';

const [
    { createReadStream, readFileSync: read, writeFileSync: write, readdirSync: readDir, unlinkSync: remove },
    { join, resolve } ] = [ fs, path ],
    app = express.Router();

console.log( 'DIRNAME', __dirname );
console.log( 'bundlePath: ', resolve(), '\n', readDir( resolve( __dirname, 'public/js' ) )[ 0 ] );

/**
 * @function static shorthand function for the express static function
 */
function serveStatic ( staticContentPath ) {
    return express.static( join( __dirname, staticContentPath ) )
};

/**
 * @function streamResource
 * Stream resources requested by front end
 */
function streamResource ( resourcePath, mime, responseObject ) {
    try {
        createReadStream( join( __dirname, resourcePath ) )
            .pipe( responseObject.set( mime ).status( 200 ) )
    } catch ( err ) {
        console.error( err );
        responseObject.status( 500 ).send( err );
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
 * Resolve SASS files to css files
 */
sassFile( './public/style/global.scss' );

/**
 * Generic route to handle logging
 */
app.all( '*', ( { path }, { statusCode }, next ) => {
    console.log( statusCode, ' PATH: ', path );
    next();
} )

/**
 * @description application static routes
 */
app.use( serveStatic( 'public' ) );

app.use( '/seo', serveStatic( 'public/seo' ) )

app.use( '/global-stylesheet', serveStatic( 'public/style/global.css' ) );

/**
 * @description Application end points
 */
app.get( '/', ( req, res ) => streamResource( 'public/index.html', 'text/html', res ) );

const readBundle = ( path ) => {
    console.log( 'path: ', path );

    console.log( resolve( __dirname, path ) );
    console.log( readDir( resolve( __dirname, path )[ 0 ] ) );

    // remove( '/Users/cliff/git/the-game-is-trivia/.DS_Store' )

}
readBundle( 'public/js' );
app.get( '/bundle', ( req, res ) => streamResource( 'public/js/', 'text/javascript', res ) );

export default app;