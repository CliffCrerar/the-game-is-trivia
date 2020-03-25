/**
 * MongoDb test connect
 */

const { } = process.env;

connectionString;

export default function testConnect () {
    const MongoClient = require( 'mongodb' ).MongoClient;
    const uri = `mongodb+srv://<username>:<password>@google-mongo-2pvom.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient( uri, { useNewUrlParser: true } );
    client.connect( err => {
        const collection = client.db( "devsens" ).collection( "users" );
        console.log( 'collection: ', collection );
        // perform actions on the collection object
        client.close();
    } );
}


