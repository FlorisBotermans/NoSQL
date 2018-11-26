const Thread = require('../models/thread');

module.exports = {
    createnew(req, res, next){
        const thread = req.body;

        Thread.create(thread)
        .then(user => res.send(thread))
        .catch(next);
    }
};