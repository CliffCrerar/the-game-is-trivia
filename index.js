/**
 * Application entry point
 */
process.env.NODE_PATH = [ './', './utils' ].join( require( 'os' ).platform() === 'win32' ? ';' : ':' );

import express from 'express';
import path from 'path';
import app from './app';
import fs from 'fs';

const server = express();
const [ { readFileSync: read }, { resolve } ] = [ fs, path ];

/**
 * @function normalizePort
 * Normalizes the port if PORT environment veriable is not set
 */
const normalizePort = ( val ) => {
    var port = parseInt( val, 10 );

    if ( isNaN( port ) ) {
        // named pipe
        return val;
    }

    if ( port >= 0 ) {
        // port number
        return port;
    }

    return false;
};
/**
 * @function environmentConfig
 * Exported result of combination of read file, resolve path, to string, split, and map.
 */
read( resolve( '.env' ) )
    .toString() // buff to string
    .split( '\n' ) // file content to array
    .map( pair => { // remap array values
        const [ key, val ] = pair.split( '=' ); // use '=' as delimiter
        process.env[ key ] = val; // create environment variables
        return { [ key ]: val }; // return remap for pure function
    } )

server.use( '/', app );
const port = normalizePort( process.env.PORT, 3000 )

server.listen( port, () => {
    console.log( ` ------app running on port ${ port } --------- ` );
} )

