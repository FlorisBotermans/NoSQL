const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/studdit_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});