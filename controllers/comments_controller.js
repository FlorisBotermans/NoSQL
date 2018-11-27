const User = require('../models/user');
const Thread = require('../models/thread');
const Comment = require('../models/comment');

module.exports = {
    // COMMENT CRUD
    createComment(req, res, next) {
        const comment = new Comment(req.body);

        Comment.create(comment)
            .then(() => User.findById({ _id: req.params.userid }))
            .then(user => {
                comment.user = user;
                return comment.save();
            })
            .then(() => Thread.findById({ _id: req.params.threadid }))
            .then(thread => {
                thread.comments.push(comment)
                return thread.save();
            })
            .then(() => res.send(comment))
            .catch(next);
    },

    createCommentExistingComment(req, res, next) {
        // MUST BE CREATED WITH NEO4J
    },

    editComment(req, res, next) {
        // MUST BE CREATED WITH MONGOOSE
    },

    deleteComment(req, res, next) {
        Thread.update(
            { $pull: { comments: req.params.commentid } } 
        )
        .then(() => Comment.findByIdAndDelete({ _id: req.params.commentid }))
        .then(comment => res.status(204).send(comment))
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