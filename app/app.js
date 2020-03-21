/**
 * Application view engine entry point
 */
import express from 'express';
import fs from 'fs';
import path from 'path';
import sass from 'node-sass';

const [ { createReadStream, readFileSync: read, writeFileSync: write }, { join } ] = [ fs, path ]
const app = express.Router();

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
        createReadStream( join( __dirname, resourcePath ).pipe( res.set( mime ).status( 200 ) ) )
    } catch ( err ) {
        responseObject.status( 500 ).send( err );
    }
};

function sassFile ( file ) {
    const origin = join( __dirname, file );
    const { stats, css } = sass.renderSync( { data: read( origin, 'utf8' ) } );
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


function test () {
    console.log( 'this is a test' );
}

/**
 * Application front end routing
 */
app.use( '/', serveStatic( 'public' ) );

app.use( '/', serveStatic( 'public/seo' ) );

app.use( '/', serveStatic( 'js' ) )

app.use( '/global-stylesheet', serveStatic( 'public/style/global.css' ) );

app.get( '/', ( req, res ) => streamResource( 'views/public/index.html', 'text/html', res ) );

app.get( '/testscript', ( req, res ) => streamResource( 'views/js/layout.js', 'text/javascript', res ) );

export default app;