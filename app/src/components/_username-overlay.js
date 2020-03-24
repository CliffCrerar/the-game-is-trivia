/**
 * Username overlay
 */

import { html } from 'lit-html';
import { byName } from '../_declarations';
import Lobby from '../pouchdb';
import guid from 'guid';
import appAlerts from './_alerts';

function GetUserName ( userNameExists ) {

    window.onload = () => byName( 'username' )[ 0 ].focus();

    const handleSubmission = ( ev ) => {

        ev.preventDefault();

        const
            userName = ev.target.elements.username.value,
            _id = guid.create().value;

        if ( userName === '' ) {
            appAlerts( 'Enter a username', 'error' );
            byName( 'username' )[ 0 ].focus();
        } else {
            Lobby.put( { _id, userName }, function ( error, response ) {
                if ( error ) {
                    appAlerts( `${ error.status }: ${ error.name }`, 'error' );
                    appAlerts( `${ error.message }`, 'error' );
                } else {
                    localStorage.setItem( 'user_id', response.id );
                    appAlerts( `User created: OK`, 'success' );
                }
            } )
        }
    }

    if ( userNameExists ) {
        console.log( 'no username' );
        return html`
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
        `;
    } else {
        console.log( 'username' );
    }
}

export default GetUserName;