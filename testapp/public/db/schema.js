import db from './rxdb';


db.then(rxObject=>{
    console.log('rxObject: ', rxObject);
    rxObject.collection(rxSchemas().userSchema).then(collection=>{
        console.log(collection);
    });
})


function rxSchemas() {
    return {
        userSchema: {
            version: 0,
            userId: 'number',
            userName: 'string',
            loggedIn: false,
            index: ['userId']
        }
    }
}



export default rxSchemas()