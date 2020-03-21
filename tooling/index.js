/**
 * App tooling
 */

( function ( GLOBAL ) {

    const [
        {
            // fs
            readFileSync,
            createReadStream,
            createWriteStream,
        }, {
            // path
            resolve,
            join,

        } ] =
        [ require( 'fs' ), require( 'path' ) ];

    GLOBAL.constructor.prototype.READFILE = readFileSync;
    GLOBAL.constructor.prototype.RESOLVEPATH = resolve;
    GLOBAL.constructor.prototype.JOINPATH = join;
    GLOBAL.constructor.prototype.READSTREAM = createReadStream;
    GLOBAL.constructor.prototype.WRITESTREAM = createWriteStream;

    console.log( 'GLOBAL: ', global.constructor );
} )( global )


