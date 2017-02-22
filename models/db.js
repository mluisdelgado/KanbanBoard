const Promise = require('bluebird');
const Datastore = require('nedb');

let db = Promise.promisifyAll(new Datastore({filename: 'models/persistance/data', autoload: true}));

db.findOneAsync({type: 'model'})
.then(model => {
    if(!model)
        insertDefaultModel();
}).catch(err => {
    console.log('Failure with the database: ' + err);
    process.exit(1);
})

function insertDefaultModel(){
    db.insertAsync({type: 'model', model: [
        'IDEAS',
        'REQ GATHERING - TO DO', 'REQ GATHERING - DOING',
        'ANALYSIS - TO DO', 'ANALYSIS - DOING',
        'DEVELOPMENT - BACKLOG', 'DEVELOPMENT - TO DO', 'DEVELOPMENT - DOING', 'DEVELOPMENT - ACC TEST',
        'RELEASE - TO DO', 'RELEASE - DOING', 'RELEASE - DOING',
        'ARCHIVED',
        'DONE'
    ]})
    .catch(err => {
        console.log('Failure with the database: ' + err);
        process.exit(1);
    })
}

module.exports = db
