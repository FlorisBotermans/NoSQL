const UsersController = require('../controllers/users_controller');
const ThreadsController = require('../controllers/threads_controller');
const CommentsController = require('../controllers/comments_controller');

module.exports = (app) => {
    // user CRUD
    app.post('/api/users', UsersController.createNewUser);
    app.get('/api/users', UsersController.getAllUsers);
    app.put('/api/users/:userid', UsersController.editUser);
    app.get('/api/users/:userid', UsersController.getUserById);
    app.delete('/api/users/:userid', UsersController.deleteUser);

    // thread CRUD
    app.post('/api/users/:userid/threads', ThreadsController.createNewThread);
    app.get('/api/users/:userid/threads', ThreadsController.getAllThreads);
    app.put('/api/users/userid/:userid/threads/:threadid', ThreadsController.editThread);
    app.get('/api/users/userid/:userid/threads/:threadid', ThreadsController.getThreadById);
    app.delete('/api/users/userid/:userid/threads/:threadid', ThreadsController.deleteThread);

    // comment CRUD
    app.post('/api/users/userid/:userid/threads/:threadid/comments', CommentsController.createNewComment);
    app.get('/api/users/userid/:userid/threads/:threadid/comments', CommentsController.getAllComments);
    app.put('/api/users/userid/:userid/threads/:threadid/comments/:commentid', CommentsController.editComment);
    app.get('/api/users/userid/:userid/threads/:threadid/comments/:commentid', CommentsController.getCommentById);
    app.delete('/api/users/userid/:userid/threads/:threadid/comments/:commentid', CommentsController.deleteComment);

}