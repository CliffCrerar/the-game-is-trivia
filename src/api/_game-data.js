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
console.log( 'db: ', db );

// db.on( 'connect', ( info ) => {
//     console.log( 'info: ', info );

// } );

db.then( async info => {
    // console.log( 'info', info );

    // console.log( 'User: ', User );
    // const findUser = await User.find( { name: { $eq: 'poesbal' } } );
    // console.log( 'findUser: ', findUser );
    // const newUser = new User( { name: 'poesbal' } );
    // console.log( 'newUser: ', newUser );
    // newUser.save();

} );

const User = new mongoose.model( 'user', { name: String } );
console.log( 'User: ', User );

export { User };





// export default ConnectionDetailsObserver;

