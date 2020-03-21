/**
 * Application API
 */

import express from 'express';
import PouchDB from './server-db-conf';
import fs from 'fs'



const api = express.Router();
const pouchdb = new PouchDB( 'lobby' )
const { createReadStream } = fs;

api.all( '*', ( { path }, { statusCode }, next ) => {
    console.log( 'API-', statusCode, 'PATH: ', path )
    next()
} )

api.get( '/pouchdb', ( req, res ) => res.status( 200 ).send( pouchdb ) )

// api.get( '/api/pouchdb', ( req, res ) => {

// } )

export default api;