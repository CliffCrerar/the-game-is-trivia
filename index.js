/**
 * Application entry point
 */


import express from 'express';
import webpack from 'webpack';
import path from 'path';
import app from './app';
import api from './api'
import fs from 'fs';
import os from 'os';

/**
 * @description Script tools
 */
const
    [
        { readFileSync: read, unlinkSync: remove, readdirSync: readDir },
        { resolve, join },
        { platform, hostname: host }
    ] = [ fs, path, os ];
let defaultPort = 3000;

/**
 * @function configureNodePath sets up the node path for the application
 */
function configureNodePath () {
    return process.env.NODE_PATH = [ './', './utils' ]
        .join( platform() === 'win32' ? ';' : ':' );
}

/**
 * @function normalizePort
 * Normalizes the port if PORT environment variable is not set
 */
function normalizePort ( val ) {
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
 * @function configureEnvironment
 * @description environmentConfig
 * Exported result of combination of read file, resolve path, to string, split, and map.
 */
function configureEnvironment () {
    return read( resolve( '.env' ) )
        .toString() // buff to string
        .split( '\n' ) // file content to array
        .map( pair => { // remap array values
            const [ key, val ] = pair.split( '=' ); // use '=' as delimiter
            process.env[ key ] = val; // create environment variables
            return { [ key ]: val }; // return remap for pure function
        } )
}
/**
 * @description Use webpack to compile browser code
 */
async function configureBrowserCode () {
    console.log( process.env.NODE_ENV );
    const
        devMode = process.env.NODE_ENV === 'development',
        appEntry = {
            main: [ resolve( 'app/src/index.js' ) ]
        },
        outFileName = devMode ? 'bundle.[name].js' : 'bundle.[hash].[name].js',
        outFilePath = resolve( 'app/public/js' );

    readDir( outFilePath ).forEach( file => remove( join( outFilePath, file ) ) ) // clean path
    // configure front end code on return also demonstrates closures
    await webpack( {
        mode: process.env.NODE_ENV,
        entry: appEntry,
        output: {
            filename: outFileName,
            path: outFilePath
        }
    } ).run( ( err ) => {
        try {
            if ( err ) throw new Error( err );
        } catch ( err ) {
            console.error( err.message );
            console.error( err.stack );
            process.exit( 5 ) // exit on node code 5 fatal error
        }
    } )
    return;
}

/**
 * @function configureServer configures application server
 */
function configureServer ( callback ) {
    const server = express();
    const port = normalizePort( process.env.PORT || defaultPort );
    server.use( '/', app );
    server.use( '/api', api )
    return callback( server, port );
}

/**
 * @function serverFeedback provides feedback on server start action
 */
function serverFeedback ( port ) {
    console.log( '|------------------------------------|' )
    console.log( ` server running:${ host() }:${ port }  ` )
    console.log( '|------------------------------------|' )
}

/**
 * @function anonymous
 * @description server startup procedure in self invoking function
 */
( async function () {
    configureNodePath();
    configureEnvironment();
    await configureBrowserCode();
    return await configureServer( ( server, port ) => ( { server, port } ) );
}() ).then( ( { server, port } ) => server.listen( port, serverFeedback( port ) ) )