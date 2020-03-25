/**
 * MongoDb test connect
 */

export default function testConnect () {
    const { MONGOUSER, MONGOPASS, MONGOHOST, MONGODB } = process.env;
    console.log( 'MONGODB: ', MONGODB );
    console.log( 'MONGOHOST: ', MONGOHOST );
    console.log( 'MONGOPASS: ', MONGOPASS );
    console.log( 'MONGOUSER: ', MONGOUSER );

    const connectionString = `mongodb+srv://${ MONGOUSER }:${ MONGOPASS }@${ MONGOHOST }/${ MONGODB }?retryWrites=true&w=majority`;
    const MongoClient = require( 'mongodb' ).MongoClient;
    const uri = connectionString;
    console.log( 'Connecting to Mongo Atlas' );
    MongoClient.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true }, ( err, client ) => {
        if ( err ) { throw new Error( err ); process.exit( 3 ); }
        else { console.log( '--- SUCCESS ---' ); client.close(); }
    } );
    return;
}


