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
    .plugin( replicate )

const lobby = new PouchDB( 'lobby', { adapter: 'memory' } )

const pouchExpressApp = pouchDbExpress( PouchDB );

function changeListener ( event ) {
    console.log( 'Change: ', event );
}

lobby.addListener( 'changes', changeListener )



export { pouchExpressApp, PouchDB }