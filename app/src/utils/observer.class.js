
/**
 * @name Event-Emitter
 * @description Event emitter created using the observable callback patter
 */
class Observer {
    internalStore;
    constructor () { this.internalStore = []; }
    wait = ( ev ) => this.internalStore.push( ev );
    emit = ( data ) => this.internalStore.forEach( ev => ev( data ) )
    destroy = () => delete this;
}

export default EventEmitter;