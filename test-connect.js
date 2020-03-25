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
    MongoClient.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true }, ( err, client ) => {
        console.log( 'err: ', err );
        console.log( 'client: ', client );
        client.close();
    } );
    return;
}


