/**
 * App tool and other global declarations
 */

const
    $ = document,
    create = ( el ) => $.createElement( el ),
    byId = ( id ) => $.getElementById( id ),
    byName = ( name ) => $.getElementsByName( name ),
    byTag = ( tag ) => $.getElementsByTagName( tag );


export { $, create, byId, byName, byTag };