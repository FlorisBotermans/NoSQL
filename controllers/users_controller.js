const User = require('../models/user');

module.exports = {
    // USER CRUD
    createUser(req, res, next) {
        User.create(new User(req.body))
            .then(user => res.send(user))
            .catch(next);
    },

    editUser(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    deleteUser(req, res, next) {
        User.findByIdAndRemove({ _id: req.params.userid })
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