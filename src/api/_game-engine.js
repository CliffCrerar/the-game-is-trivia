/**
 * Pouch db
 */

import PouchDB from 'pouchdb-core';
import mem from 'pouchdb-adapter-memory';
import http from 'pouchdb-adapter-http';
import replicate from 'pouchdb-replication';
import pouchDbExpress from 'express-pouchdb';
import { users } from './_game-data';
import LOG from '../utils/logger';

PouchDB
    .plugin( mem )
    .plugin( http )
    .plugin( replicate );

let Users;

const Lobby = new PouchDB( 'lobby', { adapter: 'memory' } );

const pouchExpressApp = pouchDbExpress( PouchDB );

( ( cb ) => {
    const testUsers = [
        { _id: '41e8c9ad-fbb2-65ff-5c41-8c6e715347e2', name: 'FictitiousOne', online: true },
        { _id: 'bea0e99a-5e25-3cda-1eed-deeed532d3d5', name: 'FictitiousTwo', online: false },
        { _id: 'a7a6bdf5-1dd5-586a-bc75-a0438bf6d315', name: 'FictitiousThree', online: false },
        { _id: 'b1e31008-c067-0611-3bce-99c5641cb302', name: 'FictitiousFour', online: true }
    ];

    Lobby.bulkDocs( testUsers, function ( error, result ) {
        if ( error ) {
            console.err( 'ERROR DEV USERS', err.message, "STACK: ", err.stack );
        }
    } );

    cb();
} )( function () {

    Lobby.changes( {
        since: 'now',
        live: true,
        include_docs: true
    } )
        .on( 'change', handleChange )
        .on( 'error', handleError )
        .on( 'complete', handleComplete );

} );



function handleChange ( change ) {
    // console.log( 'change: ', change );
    console.log( '-------------------------------------' );
    LOG( 'CHANGE DETECTED: ', new Date() );
    LOG( 'ID: ', change[ 'id' ] );
    LOG( 'CHANGE DOC:', JSON.stringify( change.doc ) );
    Object.keys( change.doc ).forEach( key => LOG( '** DOC ATTR --> ', key, ':', change.doc[ key ] ) );

    console.log( '-------------------------------------' );
}

function handleError ( err ) { console.log( 'ERR:', err ); }

function handleComplete ( info ) { console.log( 'Complete Event', info ); }

/**
 * @description Dev Code this must be removed
 * @name TODO:
 */

export { pouchExpressApp, Lobby };