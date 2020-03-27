/**
 * Pouchdb to connect with server
 */

import PouchDB from 'pouchdb';
import appAlerts from './alerts.service';
import Observer from '../../utils/observer-class';

// Connect to remote lobby NOTE! no pouchdb is created locally
const remoteLobby = new PouchDB( location.origin + '/game-engine/lobby' );

/**
 * @name exitLobby
 * @description used to exit a user from the lobby before unload event
 */
function exitLobby () {

    const userIdToExit = localStorage.getItem( 'user_id' );

    remoteLobby.delete( userIdToExit );

    window.onbeforeunload = function () {
        return "Leaving?";
    };

}

/**
 * @name enterLobby
 * @description enters users into server side lobby by using pouchdb get and put
 * @param user the user to enter the lobby
 */
function enterLobby ( user, remote ) {

    const { get, put } = remote;

    delete user[ '__v' ];

    get( user._id, { include_all: true }, ( getError, getResult ) => {

        if ( getError ) {

            put( user, { include_all: true }, function ( putError, putResult ) {

                if ( putError ) {

                    appAlerts( `${ putError.status }: ${ error.name }`, 'error' );
                    appAlerts( `${ putError.message }`, 'error' );

                } else {

                    appAlerts( `User entering game lobby` );
                    localStorage.setItem( 'user_id', putResult.id );

                }
            } );

        } else {
            console.log( 'Callback Result', getResult );
        }
    } );
};

/**
 * @name Lobby
 * @description TODO:
 * @param app 
 */
function LobbyService ( app ) {

    const activity = new Observer();

    this.activity = activity;

    this.app = app;

    this.remote = remoteLobby;

    this.playersInLobby = [];

    this.enterLobby = ( user ) => enterLobby( user, this.remote );

    this.exit = exitLobby;

    this.remote.changes( {

        live: true,
        include_docs: true

    } ).on( 'change', function ( change ) {

        activity.emit( change.doc );

    } ).on( 'error', function ( err ) {

        console.log( 'err: ', err );

    } ).on( 'complete', ( completeInfo ) => console.log( 'completeInfo', completeInfo ) );

}

export default LobbyService;

