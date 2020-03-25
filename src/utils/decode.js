/**
 * @function decode
 */
export default ( code ) => Buffer.from( code, 'base64' ).toString( 'ascii' );
