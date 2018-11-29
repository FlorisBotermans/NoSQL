const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('user');

describe('User controller', () => {
    it('POST to api/users creates a new user', done => {
        User.countDocuments().then(count => {
            request(app)
                .post('/api/users')
                .send({ userName: 'testUser', password: 'testPassword' })
                .end(() => {
                    User.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('PUT to api/users edits a user password', done => {
        const user =  new User({ userName: 'testUser', password: 'testCurrentPassword' })

        user.save().then(() => {
            request(app)
                .put('/api/users')
                .send({ userName: 'testUser', currentPassword: 'testCurrentPassword', newPassword: 'testChangedPassword' })
                .end(() => {
                    User.findOne({ userName: 'testUser' })
                        .then(user => {
                            assert(user.password === 'testChangedPassword');
                            done();
                        });
                });
        });
    });
});