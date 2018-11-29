const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/studdit_test', { useNewUrlParser: true });
    console.log('Connected to studdit_test database');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});

beforeEach(done => {
    const { users, threads } = mongoose.connection.collections;
    users.drop(() => {
        threads.drop(() => {
            done();
        });
    });
});