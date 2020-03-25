/**
 * Pouchdb to connect with server
 */

import PouchDB from 'pouchdb';

const Lobby = new PouchDB( location.origin + '/api/lobby' );

Lobby.changes( {
    since: 'now',
    live: true,
    include_docs: true
} ).on( 'change', function ( change ) {
    console.log( 'change: ', change );

} ).on( 'error', function ( err ) {
    console.log( 'err: ', err );

} );

export default Lobby;

