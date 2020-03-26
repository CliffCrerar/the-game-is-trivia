/**
 * Pouchdb to connect with server
 */

import PouchDB from 'pouchdb';
import appAlerts from './alerts.service';

/**
 * @name playerList
 * @description TODO:
 * @param lobby 
 * @param callback 
 */
function playerList ( lobby, callback ) {

    return lobby.allDocs()
        .then( docs => callback( docs ) )
        .catch( error => callback( error ) );

}
/**
 * @name exitLobby
 * @description used to exit a user from the lobby before unload event
 */
function exitLobby () {

    const userIdToExit = localStorage.getItem( 'user_id' );

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

    this.app = app;

    this.remote = new PouchDB( location.origin + '/game-engine/lobby' );

    this.playersInLobby = ( lobbyCallback ) => playerList( this.remote, lobbyCallback );

    this.enterLobby = ( user ) => enterLobby( user, this.remote );

    this.remote.changes( {

        since: 'now',
        live: true,
        include_docs: true

    } ).on( 'change', function ( change ) {

        console.log( 'change: ', change );

    } ).on( 'error', function ( err ) {

        console.log( 'err: ', err );

    } );

    /**
     * @description Dev Code this must be removed
     * @name TODO:
     */

    this.enterLobby(
        { _id: '41e8c9ad-fbb2-65ff-5c41-8c6e715347e2', name: 'FictitiousOne' } );
    // this.enterLobby(
    //     { _id: 'bea0e99a-5e25-3cda-1eed-deeed532d3d5', name: 'FictitiousTwo' } );
    // this.enterLobby(
    //     { _id: 'a7a6bdf5-1dd5-586a-bc75-a0438bf6d315', name: 'FictitiousThree' } );
    // this.enterLobby(
    //     { _id: 'b1e31008-c067-0611-3bce-99c5641cb302', name: 'FictitiousFour' } );
}

export default LobbyService;

