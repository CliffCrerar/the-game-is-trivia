/**
 * @component Username-overlay
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

    this.app = app;

    handleSubmission.bind( this );

    function handleSubmission ( ev ) {

        ev.preventDefault();

        const userName = ev.target.elements.username.value;

        if ( userName === '' ) {

            appAlerts( 'Enter a username', 'error' );
            byName( 'username' )[ 0 ].focus();

        } else {

            fetch( '/api/check-user/' + userName )

                .then( response => {

                    response.json()

                        .then( body => {
                            console.log( 'body: ', body );
                            app.lobbyService.enterLobby( body );
                            app.renderPlayerList();
                        } );
                } )

                .catch( error =>
                    console.error( 'ERROR RETRIEVING USERS\n', error.message, '\n', error.stack )
                );
        }
    };



    this.template = () => {
        return html`
        <div id="get-username-overlay">
            <style>
                .username-overlay{
                    position: absolute;
                    top:0;
                    left:0;
                    height: 100vh;
                    width: 100vw;
                    background: rgba(0,0,0,0.8);
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
                    <form autocomplete="off" @submit=${ handleSubmission } action="/check-user"  class="box-shadow-1">
                        <label>Enter your username</label>
                        <input name="username" placeholder="username" type="text">
                        <button class="btn-primary">Enter</button>
                    </form>
                </div>
            </div>
        </div>`;
    };
    return this.template();
}

export default EnterUserName;