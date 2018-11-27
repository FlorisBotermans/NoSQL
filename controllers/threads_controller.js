const User = require('../models/user');
const Thread = require('../models/thread');

module.exports = {
    // THREAD CRUD
    createThread(req, res, next) {
        const thread = new Thread(req.body);

        Thread.create(thread)
            .then(() => User.findById({ _id: req.params.userid }))
            .then(user => {
                user.threads.push(thread)
                return user.save();
            })
            .then(() => res.send(thread))
            .catch(next);
    },

    getAllThreads(req, res, next) {
        Thread.find()
            .then(threads => res.send(threads))
            .catch(next);
    },

    getThreadById(req, res, next) {
        Thread.findById({ _id: req.params.threadid })
            .then(thread => res.send(thread))
            .catch(next);
    },

    editThread(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    deleteThread(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    // UPVOTE & DOWNVOTE THREAD CRUD
    upvoteThread(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    downvoteThread(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    }
};