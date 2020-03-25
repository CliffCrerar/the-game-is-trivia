/**
 * Pouch db
 */

import PouchDB from 'pouchdb-core';
import mem from 'pouchdb-adapter-memory';
import http from 'pouchdb-adapter-http';
import replicate from 'pouchdb-replication';
import pouchDbExpress from 'express-pouchdb';

PouchDB
    .plugin( mem )
    .plugin( http )
    .plugin( replicate );

const Lobby = new PouchDB( 'lobby', { adapter: 'memory' } );

const pouchExpressApp = pouchDbExpress( PouchDB );

Lobby.changes( {
    since: 'now',
    live: true,
    include_docs: true
} ).on( 'change', function ( change ) {
    console.log( 'change: ', change );

} ).on( 'error', function ( err ) {
    console.log( 'err: ', err );

} );


export { pouchExpressApp, PouchDB };