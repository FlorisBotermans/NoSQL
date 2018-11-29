const User = require('../models/user');
const Thread = require('../models/thread');

module.exports = {
    createThread(req, res, next) {
        const thread = new Thread({title: req.body.title, content: req.body.content});
        console.log(thread);

        Thread.create(thread)
            .then(() => User.findOne({ userName: req.body.userName }))
            .then(user => {
                user.threads.push(thread._id);
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
        if(req.body.content != null) {
            Thread.findByIdAndUpdate(
                { _id: req.params.threadid },
                { $set: { content: req.body.content } }
            )
            .then(() => Thread.findById({ _id: req.params.threadid }))
            .then(thread => res.send(thread))
            .catch(next);
        } else {
            res.status(422).send({ error: 'Only the content can be modified.' });
        }
    },

    deleteThread(req, res, next) {
        User.findByIdAndUpdate(
            { _id: req.params.userid },
            { $pull: { threads: req.params.threadid } } 
        )
        .then(() => Thread.findByIdAndDelete({ _id: req.params.threadid }))
        .then(thread => res.status(204).send(thread))
        .catch(next);
    },

    upvoteThread(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    downvoteThread(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    }
};