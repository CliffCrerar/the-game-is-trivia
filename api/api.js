/**
 * Application API
 */

import express from 'express';
import { pouchExpressApp, PouchDB } from './_game-engine';
import './_mongo';
const
    api = express.Router(),
    node = new PouchDB( 'test-node', { adapter: 'memory' } );

const { [ 'MONGO-OPTION' ]: mOption, [ 'MONGO-STRING' ]: mString } = process.env;
console.log( 'mString: ', mString );
console.log( 'mOption: ', mOption );


api.use( pouchExpressApp );

api.all( '*', ( { path }, { statusCode }, next ) => {
    console.log( 'API-', statusCode, 'PATH: ', path );
    next();
} );

export default api;