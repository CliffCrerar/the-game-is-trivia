/**
 * Username overlay
 */

import { html } from 'lit-html';
import { byName, byId } from '../tools';
import Lobby from '../services/lobby.service.mjs';
import guid from 'guid';
import appAlerts from '../services/alerts.service.mjs';
import OpponentList from './_players';

/**
 * @name EnterUserName
 * @description TODO:
 * @param {*} app 
 */
function EnterUserName ( app ) {

    console.log( 'init' );

    this.app = app;

    this.handleSubmission = ( ev ) => {

        ev.preventDefault();

        const userName = ev.target.elements.username.value;

        if ( userName === '' ) {
            appAlerts( 'Enter a username', 'error' );
            byName( 'username' )[ 0 ].focus();
        } else {
            fetch( '/api/check-user/' + userName )
                .then( response => {
                    console.log( 'response: ', response );
                    response.json()
                        .then( body => {
                            console.log( 'body: ', body );
                            app.lobbyService.enterLobby( body );
                            this.app.renderPlayerList();
                        } );
                } )
                .catch( error =>
                    console.error( 'ERROR RETRIEVING USERS\n', error.message, '\n', error.stack )
                );
        }
    };

    this.template = () => {
        // byId( 'get-username-overlay' ).onload = () => byName( 'username' )[ 0 ].focus();
        return html`
        <div id="get-username-overlay">
            <style>
                .username-overlay{
                    position: absolute;
                    top:0;
                    left:0;
                    height: 100vh;
                    width: 100vw;
                    background: rgba(0,0,0,0.2);
                    z-index: 100;
                }
                .username-form{
                    position: relative;
                    top:50%;
                    transform: translateY(-50%);
                    padding: 20px 0 20px 0;
                }
                .username-form form {
                    background: white;
                    display: inline-block;
                    margin: auto;
                    padding: 20px;
                }

            </style>
            <div class="username-overlay">
                <div class="username-form text-center">
                    <form autocomplete="off" @submit=${ this.handleSubmission } action="/check-user"  class="box-shadow-1">
                        <label>Enter your username</label>
                        <input name="username" placeholder="username" type="text">
                        <button class="btn-primary">Enter</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    };
    return this.template();
}

export default EnterUserName;