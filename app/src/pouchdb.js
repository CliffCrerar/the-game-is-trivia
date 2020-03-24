/**
 * Pouchdb to connect with server
 */

import PouchDB from 'pouchdb';

const Lobby = new PouchDB( location.origin + '/api/lobby' );

export default Lobby;

