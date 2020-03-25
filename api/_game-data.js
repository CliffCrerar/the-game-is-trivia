/**
 * @name TODO
 * @description Links up with the game data
 */

import { MongoClient } from 'mongodb';
import Observer from '../utils/observer-class';
import configureEnvironment from '../utils/env-config';
import __ from '../utils/decode';
import mongoose, { Schema, model } from 'mongoose';

configureEnvironment();

const
    { MONGOUSER, MONGOPASS, MONGOHOST, MONGODB } = process.env,
    connectionString = `mongodb+srv://${ __( MONGOUSER ) }:${ __( MONGOPASS ) }@${ __( MONGOHOST ) }/${ __( MONGODB ) }?retryWrites=true&w=majority`;

mongoose.connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true } );

const userSchema = new Schema( { user_id: String, userName: String } );

const users = new model( 'user', userSchema );

export { users };




// export default ConnectionDetailsObserver;

