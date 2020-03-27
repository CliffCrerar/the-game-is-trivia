/**
 * @description browser code entry point
 */
import App from './components';
import { $, create, byId, byName, byTag } from './tools';
import { render, html } from 'lit-html';
import LobbyService from './services/lobby.service.mjs';

const appFrame = html`
        <nav class="box-shadow-2"></nav>
        <header></header>
        <main></main>
        <footer></footer>
    `;

( ( callback ) => {
    render( appFrame, byId( 'app-root' ) );
    return callback();
} )( function () {
    App.initialize();
} );;


// $.body.style.background = `url(${ require( '../../public/img' ) })`;

// ( ( app ) => render( app, byId( 'app-root' ) ) )( App );

window.addEventListener( 'unload', ( event ) => {
    // Cancel the event as stated by the standard.
    console.log( 'UNLOAD' );
    // Lobby.activity.destroy();
    // Lobby.exit();
    // Chrome requires returnValue to be set.
    console.log( 'beforeunload' );
} );