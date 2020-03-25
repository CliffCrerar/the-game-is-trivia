/**
 * Application API
 */

import express, { json } from 'express';
import { pouchExpressApp, PouchDB, absorbUsers } from './_game-engine';
import fs from 'fs';
import path from 'path';
import sass from 'node-sass';
import { User } from './_game-data';

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
    } ] = [ fs, path ];

const
    api = express.Router(),
    indexMime = 'text/html',
    sMime = 'text/javascript',
    staticFiles = resolve( 'public' ),
    indexFile = join( staticFiles, 'index.html' ),
    globalStyleSheet = join( staticFiles, 'style/global.css' ),
    seoFiles = join( staticFiles, 'seo' ),
    scrFiles = join( staticFiles, 'js' ),
    icons = join( staticFiles, 'style/fa/icons.css' ),
    faFontFiles = join( staticFiles, 'style/fa' );
console.log( 'staticFiles: ', staticFiles );
console.log( 'globalStyleSheet: ', globalStyleSheet );
/**
 * @function static shorthand function for the express static function
 * @description TODO:
 */
function serveStatic ( staticContentPath ) {
    return express.static( staticContentPath );
};

/**
 * @function streamResource
 * @description Stream resources requested by front end
 */
function streamResource ( resourcePath, mime, responseObject ) {
    try {
        readStream( resourcePath )
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
    const origin = file;
    const { css } = sass.renderSync( { data: read( origin, 'utf8' ) } );
    return write( origin.replace( 'scss', 'css' ), css.toString(), 'utf8' );
}
/**
 * @function scriptBundle 
 * @description reads the public/js folder to see the latest hashed file
 */
function scriptBundle ( path ) {
    return join( path, readDir( path )[ 0 ] );
}
/**
 * Resolve SASS files to css files
 */
sassFile( globalStyleSheet.replace( 'css', 'scss' ) );
/**
 * @description Generic route to handle logging
 */
api.all( '*', ( { path, query, body }, { statusCode }, next ) => {
    console.log( statusCode, ' PATH: ', path, query && `QUERY: ${ JSON.stringify( query ) }` );
    console.log( statusCode, ' PATH: ', path );
    next();
} );
/**
 * @description Front ent static routes
 */
api.use( '/', serveStatic( staticFiles ) );

api.use( '/', serveStatic( seoFiles ) );

api.use( '/fa', serveStatic( faFontFiles ) );

api.use( '/icons', serveStatic( icons ) );

api.use( '/global-stylesheet', serveStatic( globalStyleSheet ) );

api.get( '/', ( req, res ) => streamResource( indexFile, indexMime, res ) );

api.get( '/bundle', ( req, res ) => streamResource( scriptBundle( scrFiles ), sMime, res ) );



/**
 * @description Api end points
 */

api.use( '/db', pouchExpressApp );

api.get( '/api/check-user/:username', ( req, res ) => {
    console.log( 'req: ', req.query );
    console.log( 'req: ', req.params );
    User.find( { name: { $eq: req.params.username } }, ( err, docs ) => {
        console.log( 'docs: ', docs );
        if ( err ) {
            console.log( 'err: ', err );
            res.status( 500 ).send( err );
        } else if ( docs.length === 0 ) {
            console.log( 'Document Not Found' );
            const newUser = new User( { "name": req.params.name } );
            console.log( 'newUser: ', newUser );
            newUser.save( ( err, newUser ) => {
                if ( err ) {
                    console.log( 'err: ', err );
                    res.status( 501 ).send( err );
                } else {
                    console.log( 'newUser: ', newUser );
                    res.status( 201 ).send( newUser );
                }
            } );
        } else {
            console.log( 'docs: ', docs );
            res.status( 200 ).send( docs );;
        }
    } );


    // res.status( 200 ).send( 'blah bitch' );
} );


export default api;