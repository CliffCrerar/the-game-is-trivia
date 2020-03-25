/**
 * @name TODO
 * @description Links up with the game data
 */

import { MongoClient } from 'mongodb';
import { Observer, configureEnvironment, __ } from '../utils';
import mongoose from 'mongoose';

configureEnvironment();

const
    { MONGOUSER, MONGOPASS, MONGOHOST, MONGODB } = process.env,
    connectionString = `mongodb+srv://${ __( MONGOUSER ) }:${ __( MONGOPASS ) }@${ __( MONGOHOST ) }/${ __( MONGODB ) }?retryWrites=true&w=majority`;
console.log( 'connectionString: ', connectionString );

const db = mongoose.connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true } );




const User = new mongoose.model( 'user', { name: String } );
console.log( 'User: ', User );

export { User };





// export default ConnectionDetailsObserver;

