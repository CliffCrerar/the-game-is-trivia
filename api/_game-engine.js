/**
 * Pouch db
 */

import PouchDB from 'pouchdb-core';
import mem from 'pouchdb-adapter-memory';
import http from 'pouchdb-adapter-http';
import replicate from 'pouchdb-replication';
import pouchDbExpress from 'express-pouchdb';
import { users } from './_game-data';

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
} )
    .on( 'change', handleChange )
    .on( 'error', handleError );

function handleChange ( change ) {
    console.log( 'change: ', change );

}

function handleError ( err ) { console.log( 'ERR:', err ); }

async function absorbUsers () {
    const Users = await users.find().exec();
    console.log( 'Users: ', Users );
    console.log( 'users: ', users );
}

export { pouchExpressApp, PouchDB, absorbUsers };