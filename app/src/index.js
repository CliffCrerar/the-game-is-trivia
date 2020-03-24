/**
 * @description browser code entry point
 */
import { $, create, byId, byName, byTag } from './_declarations';
import { render, html } from 'lit-html';
import App from './components';
import './pouchdb';

( ( app ) => render( app, byId( 'app-root' ) ) )( App )