const UsersController = require('../controllers/users_controller');
const ThreadsController = require('../controllers/threads_controller');
const CommentsController = require('../controllers/comments_controller');

module.exports = (app) => {
    // USER CRUD
    app.post('/api/users', UsersController.createUser);
    app.put('/api/users/:userid', UsersController.editUser);
    app.delete('/api/users/:userid', UsersController.deleteUser);
    // FRIENDSHIP CRUD
    app.post('/api/users/:userid/friendships', UsersController.createFriendship);
    app.delete('/api/users/:userid/friendships/:friendshipid', UsersController.deleteFriendship);

    // THREAD CRUD
    app.post('/api/users/:userid/threads', ThreadsController.createThread);
    app.get('/api/threads', ThreadsController.getAllThreads);
    app.get('/api/threads/:threadid', ThreadsController.getThreadById);
    app.put('/api/users/:userid/threads/:threadid', ThreadsController.editThread);
    app.delete('/api/users/:userid/threads/:threadid', ThreadsController.deleteThread);
    // UPVOTE & DOWNVOTE THREAD CRUD
    app.put('/api/users/:userid/threads/:threadid/upvote', ThreadsController.upvoteThread);
    app.put('/api/users/:userid/threads/:threadid/downvote', ThreadsController.downvoteThread);

    // COMMENT CRUD
    app.post('/api/users/:userid/threads/:threadid/comments', CommentsController.createComment);
    app.post('/api/users/:userid/threads/:threadid/comments/:commentid', CommentsController.createCommentExistingComment);
    app.put('/api/users/:userid/threads/:threadid/comments/:commentid', CommentsController.editComment);
    app.delete('/api/users/:userid/threads/:threadid/comments/:commentid', CommentsController.deleteComment);
    // UPVOTE & DOWNVOTE THREAD CRUD
    app.put('/api/users/:userid/threads/:threadid/comments/:commentid/upvote', CommentsController.upvoteComment);
    app.put('/api/users/:userid/threads/:threadid/comments/:commentid/downvote', CommentsController.downvoteComment);
};