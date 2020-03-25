/**
 * Application entry point
 */

import configureEnvironment from './src/utils/env-config';
import testConnect from './test-connect';
import { MongoClient } from 'mongodb';
import __ from './src/utils/decode';
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import api from './src/api';
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
    ] = [ fs, path, os ],
    mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let defaultPort = 3000;


/**
 * @function configureNodePath sets up the node path for the application
 */
function configureNodePath () {
    return process.env.NODE_PATH = [ './', './src', './src/utils' ]
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
 * @description Use webpack to compile browser code
 */
function configureBrowserCode () {

    const
        devMode = process.env.NODE_ENV === 'development',
        appEntry = {
            main: [ resolve( 'src/app/index.js' ) ]
        },
        outFileName = devMode ? 'bundle.[name].js' : 'bundle.[hash].[name].js',
        outFilePath = resolve( 'public/js' );

    readDir( outFilePath ).forEach( file => remove( join( outFilePath, file ) ) ); // clean path
    // configure front end code on return also demonstrates closures
    return webpack( {
        mode: process.env.NODE_ENV,
        entry: appEntry,
        output: {
            filename: outFileName,
            path: outFilePath
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
        }
    } ).run( ( err ) => {
        try {
            if ( err ) throw new Error( err );
        } catch ( err ) {
            console.error( err.message );
            console.error( err.stack );
            process.exit( 5 ); // exit on node code 5 fatal error
        }
    } );
}

function configureAndTestDbConnection () {
    const { MONGOUSER, MONGOPASS, MONGOHOST, MONGODB } = process.env;
    const connectionString = `mongodb+srv://${ __( MONGOUSER ) }:${ __( MONGOPASS ) }@${ __( MONGOHOST ) }/${ __( MONGODB ) }?retryWrites=true&w=majority`;
    console.log( 'Connecting to Mongo Atlas' );
    MongoClient.connect( connectionString, mongoOptions, ( err, client ) => {
        client.on( 'close', () => console.log( '--- TEST CLIENT CLOSE ---' ) );
        if ( err ) { throw new Error( err ); process.exit( 3 ); }
        else {
            console.log( 'MONGODB Connection: --- SUCCESS ---' );
            client.close();
        }
    } );
}

/**
 * @function configureServer configures application server
 */
function configureServer ( callback ) {
    const server = express();
    const port = normalizePort( process.env.PORT || defaultPort );
    server.use( api );
    return callback( server, port );
}

/**
 * @function serverFeedback provides feedback on server start action
 */
function serverFeedback ( port ) {
    console.log( '|------------------------------------|' );
    console.log( ` server running:${ host() }:${ port }  ` );
    console.log( '|------------------------------------|' );
}
/**
 * @function anonymous
 * @description server startup procedure in self invoking function
 */
( async function () {
    configureNodePath();
    configureEnvironment();
    await configureAndTestDbConnection();
    await configureBrowserCode();
    return await configureServer( ( server, port ) => ( { server, port } ) );
}() ).then( ( { server, port } ) => server.listen( port, serverFeedback( port ) ) );

