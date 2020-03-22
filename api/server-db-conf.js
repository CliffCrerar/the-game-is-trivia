/**
 * Pouch db
 */

import Pouchdb from 'pouchdb-core';
import mem from 'pouchdb-adapter-memory';
import http from 'pouchdb-adapter-http';
import replicate from 'pouchdb-replication';

Pouchdb
    .plugin( mem )
    .plugin( http )
    .plugin( replicate )

export default Pouchdb