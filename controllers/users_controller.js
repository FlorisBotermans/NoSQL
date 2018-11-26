const User = require('../models/user');

module.exports = {
    createUser(req, res, next) {
        const user = req.body;

        User.create(user)
            .then(user => res.send(user))
            .catch(next);
    }
}