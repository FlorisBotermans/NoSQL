const User = require('../models/user');
const driver = require('../neo4jdriver');

module.exports = {
    createUser(req, res, next) {
        let session = driver.session();

        User.create(new User(req.body))
            .then((user) => res.send(user))
            .then(() => {
                session.run(
                    'CREATE (a:User { userName: $userName, password: $password }) RETURN a',
                    {
                        userName: req.body.userName,
                        password: req.body.password
                    }
                )
                .then(() => session.close());
            })
            .catch(() => {
                session.close();
                next();
            });
    },

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
            res.status(422).send({ error: 'Only the password can be modified.' });
        }
    },

    deleteUser(req, res, next) {
        let session = driver.session();

        User.findOne({ userName: req.body.userName, password: req.body.password })
            .then((user) => {
                if(user === null) {
                    res.status(401).send({ error: 'You entered a faulty password.' });
                } else {
                    user.remove();
                    session.run(
                        'MATCH (a:User { userName: $userName, password: $password }) DELETE a',
                        {
                            userName: req.body.userName,
                            password: req.body.password
                        }
                    )
                    .then(() => session.close())
                    .then(() => res.status(204).send(user));
                }
            })
            .catch(() => {
                session.close();
                next();
            });
    },
};