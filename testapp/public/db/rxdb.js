
import RxDB from 'rxdb';
import idb from 'pouchdb-adapter-idb';

// RxDB.plugin(idb)

const db = async function(){
  await RxDB.plugin(idb);
  return  await RxDB.create({
    name: 'heroesdb',           // <- name
    adapter: 'idb',            // <- storage-adapter
    password: 'myPassword',     // <- password (optional)
    multiInstance: true,         // <- multiInstance (optional, default: true)
    queryChangeDetection: false // <- queryChangeDetection (optional, default: false)
  });
}

// const db = () => new Promise((resolve,reject)=>{
//   resolve('test');
// })

export default db();


