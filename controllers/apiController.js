const db = require('../models/db');

module.exports = {
    GETdata,
    POSTdata,
    GETmodel,
    POSTmodel
}

function GETdata(req, res){
    db.findAsync({ $not: { type: 'model' }})
    .then(docs => {
        docs.forEach(doc => {
            delete doc._id;
        })
        res.json(docs);
    }).catch(err => {
        res.send(err);
    })
}

function POSTdata(req, res){
    db.insertAsync(req.body)
    .then(doc => {
        delete doc._id;
        res.json(doc);
    }).catch(err => {
        res.send(err);
    })
}

function GETmodel(req, res){
    db.findOneAsync({type: 'model'})
    .then(doc => {
        delete doc.type;
        delete doc._id;
        res.json(doc);
    }).catch(err => {
        res.send(err);
    })
}

function POSTmodel(req, res){
    db.updateAsync({type: 'model'}, {type: 'model', model: req.body}, {multi: true})
    .then(() => {
        return db.remove({ $not: { type: 'model'}}, { multi: true})
    }).then(() => {
        return db.findOneAsync({type: 'model'})
    }).then(doc => {
        delete doc.type;
        delete doc._id;
        res.json(doc);
    }).catch(err => {
        res.send(err);
    })
}
