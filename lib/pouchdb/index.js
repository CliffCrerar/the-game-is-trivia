import PouchDB from 'pouchdb-core';

import mem from 'pouchdb-adapter-memory';
import http from 'pouchdb-adapter-http';
// import mapreduce from 'pouchdb-mapreduce';
import rep from 'pouchdb-replication';

PouchDB.plugin(mem)
    .plugin(http)
    .plugin(mapreduce)
    .plugin(rep);

export default PouchDB;