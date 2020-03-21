/**
 * Establish environment variables
 * My own little replacement for the dotenv package
 */

// declarations
const [
    { readFileSync: read },
    { resolve },
    { platform }

] = [ require( 'fs' ), require( 'path' ), require( 'os' ) ];

process.env.NODE_PATH = [ './', './utils' ].join( platform() === 'win32' ? ';' : ':' );

/**
 * @function 
 * Exported result of combination of read file, resolve path, to string, split, and map.
 */
module.exports = read( resolve( '.env' ) )
    .toString() // buff to string
    .split( '\n' ) // file content to array
    .map( pair => { // remap array values
        const [ key, val ] = pair.split( '=' ); // use '=' as delimiter
        process.env[ key ] = val; // create environment variables
        return { [ key ]: val }; // return remap for pure function
    } );
