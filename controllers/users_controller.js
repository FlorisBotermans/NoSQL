const User = require('../models/user');

module.exports = {
    createUser(req, res, next) {
        const user = req.body;

        User.create(user)
            .then(user => res.send(user))
            .catch(next);
    },

    // only edit password
    editUser(req, res, next) {
        const userBody = req.body;
        const userId = req.params.id;

        User.findByIdAndUpdate({ _id: userId }, userBody)
            .then(() => User.findById({ _id: userId }))
            .then(user => res.send(user))
            .catch(next);
    },

    deleteUser(req, res, next) {
        const userId = req.params.id;

        User.findByIdAndRemove({ _id: userId })
            .then(user => res.status(204).send(user))
            .catch(next);
    },

    // Must be created in Neo4J
    createFriendship(req, res, next) {
        const userFriendshipBody = req.body;
        const userId = req.params.id;
    },

    // Must be created in Neo4J
    deleteFriendship(req, res, next) {

    }
}