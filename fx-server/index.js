/**
 * @description Pouchdb console app server
 */
import Pouchdb from 'pouchdb';
import expressPouch from 'express-pouchdb';
import express from 'express';

const

    app = express(),

    thisPouch = expressPouch( Pouchdb ),

    pouchdb = new Pouchdb( 'http://localhost:3000/game-engine' ),

    port = 5984;

app.use( thisPouch );

app.listen( port, () => console.log( `POUCHDB FAUXTON RUNNING ON PORT: ${ port }` ) );