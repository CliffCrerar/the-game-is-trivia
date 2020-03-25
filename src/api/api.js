/**
 * Application API
 */

import express, { json } from 'express';
import { pouchExpressApp, PouchDB, absorbUsers } from './_game-engine';

const
    api = express.Router(),
    node = new PouchDB( 'test-node', { adapter: 'memory' } );

api.use( pouchExpressApp );

api.all( '*', ( { path }, { statusCode }, next ) => {
    console.log( 'API-', statusCode, 'PATH: ', path );
    next();
} );

api.get( '/check-user/:username', ( req, res ) => {
    console.log( 'req: ', req.query );
    console.log( 'req: ', req.params );

    res.status( 200 ).send( 'blah bitch' );
} );

export default api;