/**
 * Username overlay
 */

import { html } from 'lit-html';
import { byName, byId } from '../utils/web-tools';
import Lobby from '../services/pouchdb.service.mjs';
import guid from 'guid';
import appAlerts from '../services/alerts.service.mjs';
import OpponentList from './_opponents';


function EnterUserName ( app ) {

    window.onload = () => byName( 'username' )[ 0 ].focus();

    const handleSubmission = ( ev ) => {

        ev.preventDefault();

        const
            userName = ev.target.elements.username.value;

        fetch( '/api/check-user/' + userName )
            .then( response => console.log( 'response: ', response ) );




        // _id = guid.create().value;

        // if ( userName === '' ) {
        //     appAlerts( 'Enter a username', 'error' );
        //     byName( 'username' )[ 0 ].focus();
        // } else {
        //     Lobby.put( { _id, userName }, function ( error, response ) {
        //         if ( error ) {
        //             appAlerts( `${ error.status }: ${ error.name }`, 'error' );
        //             appAlerts( `${ error.message }`, 'error' );
        //         } else {
        //             appAlerts( `User created: OK`, 'success' );
        //             localStorage.setItem( 'user_id', response.id );
        //             app.mainComponent = new OpponentList( app );
        //             app.renderMain();
        //         }
        //     } );
    };

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
                    <form autocomplete="off" @submit=${ handleSubmission } action="/check-user"  class="box-shadow-1">
                        <label>Enter your username</label>
                        <input name="username" placeholder="username" type="text">
                        <button class="btn-primary">Enter</button>
                    </form>
                </div>
            </div>
        </div>
    `;

}

export default EnterUserName;