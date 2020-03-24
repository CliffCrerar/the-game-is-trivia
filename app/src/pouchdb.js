/**
 * Pouchdb to connect with server
 */

import PouchDB from 'pouchdb';

( ( Pouch ) => {

    window.PouchDB = Pouch;
    window.Lobby = new PouchDB( location.origin + '/api/lobby' );

} )( PouchDB );