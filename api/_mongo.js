/**
 * @name TODO
 * @description Links up with the game data
 */

import { MongoClient } from 'mongodb';
import Observer from '../utils/observer-class';

const ConnectionDetailsObserver = new Observer();

ConnectionDetailsObserver.wait( ( { connectionString, mongoOptions } ) => {
    console.log( { connectionString, mongoOptions } );
    ConnectionDetailsObserver.destroy();
} );

// console.log( process.env );


function GetMongoClient ( err, client ) {
    console.log( 'err: ', err );
    console.log( 'client: ', client );
}

// const mongo = MongoClient( mString, mOption );

// console.log( 'mongo: ', mongo );


export default ConnectionDetailsObserver;

