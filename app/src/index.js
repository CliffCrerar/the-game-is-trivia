/**
 * @description browser code entry point
 */
import App from './components';
import { $, create, byId, byName, byTag } from './utils/web-tools';
import { render, html } from 'lit-html';
import { eventLogging } from './utils';

const appFrame = html`
        <nav></nav>
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


// ( ( app ) => render( app, byId( 'app-root' ) ) )( App );