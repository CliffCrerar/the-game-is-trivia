/**
 * @description browser code entry point
 */
import { $, create, byId, byName, byTag } from './_declarations';
import { render, html } from 'lit-html';
import App from './components';
import './pouchdb';
import { eventLogging } from './utils';

// eventLogging();

// document.addEventListener( 'visibilitychange', visibilityStateChangeEvent )

// function visibilityStateChangeEvent ( ev ) {

// }

( ( app ) => render( app, byId( 'app-root' ) ) )( App )