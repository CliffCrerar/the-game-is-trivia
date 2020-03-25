/**
 * @name Observer-Class
 * @description Event emitter created using the observable callback patter
 * @author Cliff Crerar
 */
class Observer {

    constructor () {
        this.internalStore = [];
    }
    wait ( ev ) { this.internalStore.push( ev ); }
    emit ( data ) { this.internalStore.forEach( ev => ev( data ) ); }
    destroy () {
        console.log( 'Delete Observable' );
        delete this;
    }
}

export default Observer;