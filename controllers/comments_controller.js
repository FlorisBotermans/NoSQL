const Thread = require('../models/thread');

module.exports = {
    // COMMENT CRUD
    createComment(req, res, next) {
        const embeddedComment = req.body;

        Thread.findById({ _id: req.params.threadid })
            .then(thread => {
                thread.comments.push(embeddedComment);
                return thread.save();
            })
            .then(() => res.send(embeddedComment))
            .catch(next);
    },

    createCommentExistingComment(req, res, next) {
        // MUST BE CREATED WITH NEO4J
    },

    deleteComment(req, res, next) {
        Thread.findByIdAndUpdate(
            { _id: req.params.threadid },
            { $pull: { comments: { _id: req.params.commentid } } } 
        )
        .then(thread => res.status(204).send(thread))
        .catch(next);
    },

    // UPVOTE & DOWNVOTE COMMENT CRUD
    upvoteComment(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    downvoteComment(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    }
};