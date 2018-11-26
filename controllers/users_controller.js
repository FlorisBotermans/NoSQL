const User = require('../models/user');

module.exports = {
    createUser(req, res, next) {
        const user = req.body;

        User.create(user)
            .then(user => res.send(user))
            .catch(next);
    },

    editUser(req, res, next){
        const userBody = req.body;
        const userId = req.params.id;

        User.edit({_id:userId}, userBody)
        .then(()=>User.findById({_id:userId}))
        .then(user => res.send(user))
        .catch(next);
    },

    deleteUser(req, res, next){
        const userId = req.params.id;

        User.findByIdAndRemove({_id:userId})
        .then(user => res.status(204).send(user))
        .catch(next);

    }
}