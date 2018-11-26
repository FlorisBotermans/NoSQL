const UsersController = require('../controllers/users_controller');
const ThreadsController = require('../controllers/threads_controller');
const CommentsController = require('../controllers/comments_controller');

module.exports = (app) => {
    // user CRUD
    app.post('/api/users', UsersController.createUser);
    app.put('/api/users/:userid', UsersController.editUser);
    app.delete('/api/users/:userid', UsersController.deleteUser);
    // friendship CRUD
    app.post('/api/users/:userid/friendships', UsersController.createFriendship);
    app.delete('/api/users/:userid/friendships/:friendshipid', UsersController.deleteFriendship)

    // thread CRUD
    app.post('/api/users/:userid/threads', ThreadsController.createNewThread);
    app.get('/api/users/:userid/threads', ThreadsController.getAllThreads);
    app.put('/api/users/:userid/threads/:threadid', ThreadsController.editThread);
    app.get('/api/users/:userid/threads/:threadid', ThreadsController.getThreadById);
    app.delete('/api/users/:userid/threads/:threadid', ThreadsController.deleteThread);
    // Upvote & downvote thread CRUD
    app.put('/api/users/:userid/threads/:threadid/upvote', ThreadsController.upvoteThread);
    app.put('/api/users/:userid/threads/:threadid/downvote', ThreadsController.downvoteThread);

    // comment CRUD
    app.post('/api/users/:userid/threads/:threadid/comments', CommentsController.createNewComment);
    app.post('/api/users/:userid/threads/:threadid/comments/:commentid', CommentsController.createNewCommentExistingComment);
    app.put('/api/users/:userid/threads/:threadid/comments/:commentid', CommentsController.editComment);
    app.delete('/api/users/:userid/threads/:threadid/comments/:commentid', CommentsController.deleteComment);
    // Upvote & downvote thread CRUD
    app.put('/api/users/:userid/threads/:threadid/comments/:commentid/upvote', CommentsController.upvoteComment);
    app.put('/api/users/:userid/threads/:threadid/comments/:commentid/downvote', CommentsController.downvoteComment);
}