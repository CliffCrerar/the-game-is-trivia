
/**
 * @function configureEnvironment
 * @description environmentConfig
 * Exported result of combination of read file, resolve path, to string, split, and map.
 */

import fs from 'fs';
import path from 'path';
const [ { readFileSync: read }, { resolve } ] = [ fs, path ];
console.log( 'resolve( .env ): ', resolve( '.env' ) );
function configureEnvironment () {
    return read( resolve( '.env' ) ).toString() // buff to string
        .split( '\n' ) // file content to array
        .map( pair => { // remap array values
            const [ key, val ] = pair.split( '=' ); // use '=' as delimiter
            process.env[ key ] = val; // create environment variables
            return { [ key ]: val }; // return remap for pure function
        } );
}

export default configureEnvironment;