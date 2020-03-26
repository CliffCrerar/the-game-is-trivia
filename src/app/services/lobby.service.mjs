/**
 * Pouchdb to connect with server
 */

import PouchDB from 'pouchdb';
import appAlerts from './alerts.service';

function playerList ( lobby, callback ) {
    return lobby.allDocs()
        .then( docs => callback( docs ) )
        .catch( error => callback( error ) );
}

/**
 * @name Lobby
 * @description TODO:
 * @param app 
 */
function LobbyService ( app ) {

    this.app = app;

    this.remote = new PouchDB( location.origin + '/game-engine/lobby' );

    this.playersInLobby = ( lobbyCallback ) => playerList( this.remote, lobbyCallback );

    this.remote.changes( {
        since: 'now',
        live: true,
        include_docs: true
    } ).on( 'change', function ( change ) {
        console.log( 'change: ', change );

    } ).on( 'error', function ( err ) {
        console.log( 'err: ', err );

    } );

    this.enterLobby = function ( user ) {
        delete user[ '__v' ];
        this.remote.put( user, { include_all: true }, function ( error, response ) {
            if ( error ) {
                appAlerts( `${ error.status }: ${ error.name }`, 'error' );
                appAlerts( `${ error.message }`, 'error' );
            } else {
                appAlerts( `User entering game lobby` );
                localStorage.setItem( 'user_id', response.id );
            }
        } );
    };
}

export default LobbyService;

