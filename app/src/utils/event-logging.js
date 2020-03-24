/**
 * Event Logging
 * @description TODO
 */

import { $ } from '../_declarations';

const excludeEvents = [ 'pointerdown', 'mousedown', 'pointerup', 'mouseup' ];

const excludeStandardMouseEvents = [
    'pointerrawupdate',
    'mousemove',
    'pointermove',
    'mouseout',
    'pointerover',
    'pointerout',
    'mouseover',
    'pointerleave',
    'mouseleave',
    'pointerenter',
    'mouseenter',
    'wheel'
];

function eventLogging () {
    for ( var key in $ ) {
        if ( key.search( 'on' ) === 0 ) {
            $.addEventListener( key.slice( 2 ), ( ev ) => {
                ![ ...excludeStandardMouseEvents, ...excludeEvents ].includes( ev.type )
                    && console.log( 'EVENT: ', ev.type );
            } )
        }
    }
}

export default eventLogging