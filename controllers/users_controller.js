const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = {
    // USER CRUD
    // OK
    createUser(req, res, next) {
        User.create(new User(req.body))
            .then(user => res.send(user))
            .catch(next);
    },

    // OK
    editUser(req, res, next) {
        if(req.body.password != null){
            User.findByIdAndUpdate(
                { _id: req.params.userid },
                { $set: { password: req.body.password } }
            )
            .then(() => User.findById({ _id: req.params.userid }))
            .then(user => res.send(user))
            .catch(next);
        } else {
            res.status(422).send({ error: 'Only the password can be modifies.' });
        }
    },

    // NEED TO BE FIXED
    deleteUser(req, res, next) {
        User.findByIdAndDelete({ _id: req.params.userid })
            .then(user => res.status(204).send(user))
            .catch(next);
    },

    // FRIENDSHIP CRUD
    createFriendship(req, res, next) {
        // MUST BE CREATED WITH NEO4J
    },

    deleteFriendship(req, res, next) {
        // MUST BE CREATED WITH NEO4J
    }
};