const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/studdit_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users, threads, comments } = mongoose.connection.collections;
    users.drop(() => {
        threads.drop(() => {
            comments.drop(() => {
                done();
            });
        });
    });
});