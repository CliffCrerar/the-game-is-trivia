/**
 * Application API
 */

import express, { json } from 'express';
import { pouchExpressApp, PouchDB, absorbUsers } from './_game-engine';
import fs from 'fs';
import path from 'path';
import sass from 'node-sass';
import { User } from './_game-data';
/**
 * @description TODO:
 */
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
/**
 * @description TODO:
 */
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
    next();
} );
/**
 * @description Front ent static routes
 */
api.use( '/', serveStatic( staticFiles ) );
/**
 * @description TODO:
 */
api.use( '/', serveStatic( seoFiles ) );
/**
 * @description TODO:
 */
api.use( '/fa', serveStatic( faFontFiles ) );
/**
 * @description TODO:
 */
api.use( '/icons', serveStatic( icons ) );
/**
 * @description TODO:
 */
api.use( '/global-stylesheet', serveStatic( globalStyleSheet ) );
/**
 * @description TODO:
 */
api.get( '/', ( req, res ) => streamResource( indexFile, indexMime, res ) );
/**
 * @description TODO:
 */
api.get( '/bundle', ( req, res ) => streamResource( scriptBundle( scrFiles ), sMime, res ) );
/**
 * @description Api end points
 */
api.use( '/game-engine', pouchExpressApp );
/**
 * @description Get or create user and return user document
 */
api.get( '/api/check-user/:username', ( req, res ) => {

    console.log( ' | -> Get or create user and return user document' );
    console.log( ' | -> REQUESTED USER: ', req.params );

    User.find( { name: { $eq: req.params.username } }, ( err, docs ) => { // find user

        if ( err ) {

            console.log( '| -> ERROR FINDING USER: ', err );
            res.status( 500 ).send( err );

        } else if ( docs.length === 0 ) { // if user does not exist

            console.log( ' | -> User NOT FOUND' );

            new User( { "name": req.params.username } ) // create new user 
                .save( ( err, newUser ) => { // save user to db

                    if ( err ) {

                        console.log( ' | -> ERROR CREATING USER: ', err );
                        res.status( 501 ).send( err ); // return 501

                    } else {
                        console.log( ' | -> Return created user' );
                        res.status( 201 ).send( newUser ); // return created user

                    }
                } );
        } else {
            console.log( ' | -> Return existing user' );
            res.status( 200 ).send( docs[ 0 ] ); // return existing user

        }
    } );
} );


export default api;