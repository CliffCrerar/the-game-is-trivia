/**
 * Application API
 */

import express from 'express';
import { pouchExpressApp, PouchDB } from './game-engine';

const
    api = express.Router(),
    node = new PouchDB( 'test-node', { adapter: 'memory' } );


api.use( pouchExpressApp );

api.all( '*', ( { path }, { statusCode }, next ) => {
    console.log( 'API-', statusCode, 'PATH: ', path )
    next()
} )

export default api;