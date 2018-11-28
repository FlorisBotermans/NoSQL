const User = require('../models/user');
const Comment = require('../models/comment');
const driver = require('../../neo4jdriver')

module.exports = {
    

    // USER CRUD
    createUser(req, res, next) {
        User.create(new User(req.body))
            .then(user => res.send(user))
            .catch(next);
            
        let session = driver.session();
        session.run(
            'CREATE (a: user{userName: $userName}, {password: $password}) RETURN a',
            {userName: req.body.userName},
            {password: req.body.password}
        )
        .catch((err)=>{
            session.close();
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
            res.status(422).send({ error: 'Cannot modify username' });
        }
    },

    // NEED TO BE FIXED
    deleteUser(req, res, next) {
        Comment.updateMany({ $unset: { user: "" } })
        .where('user._id').equals(req.params.userid)
        .then(() => User.findByIdAndDelete({ _id: req.params.userid }))
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