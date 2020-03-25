/**
 * Application API
 */

import express from 'express';
import { pouchExpressApp, PouchDB, absorbUsers } from './_game-engine';

const
    api = express.Router(),
    node = new PouchDB( 'test-node', { adapter: 'memory' } );

function initApi () {
    absorbUsers();
}

api.use( pouchExpressApp );

api.all( '*', ( { path }, { statusCode }, next ) => {
    console.log( 'API-', statusCode, 'PATH: ', path );
    next();
} );

initApi();

export default api;