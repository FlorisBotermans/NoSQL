const UsersController = require('../controllers/users_controller');
const ThreadsController = require('../controllers/threads_controller');
const CommentsController = require('../controllers/comments_controller');

module.exports = (app) => {
    // user CRUD
    app.post('/api/users', UsersController.createNewUser);

    // thread CRUD

    // comment CRUD
}