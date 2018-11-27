const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('user');

describe('User controller', ()=> {
    it('POST to api/user creates a new user', (done)=>{
        User.countDocuments().then(count =>{
            request(app)
            .post('/api/users')
            .send({userName : 'testUser', password : 'testPassword'})
            .end(()=> {
                User.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });

    it('PUT to api/user that edits a user password', (done)=>{
        const user =  new User({userName: 'testUser', password: 'testing'})

        user.save().then(() =>{
            request(app)
            .put('/api/users/'+user._id)
            .send({password: 'changedPassword'})
            .end(()=> {
                User.findOne({userName: 'testUser'})
                .then(user=>{
                    assert(user.password === 'changedPassword');
                    done();
                });
            });
        });
    });

    it('DELETE to api/user that deletes a user', (done)=>{
        const user =  new User({userName: 'testUser', password: 'testing'})

        user.save().then(() =>{
            request(app)
            .delete('/api/users/'+user._id)
            .end(()=> {
                User.findOne({userName: 'testUser'})
                .then((user)=>{
                    assert(user === null);
                    done();
                });
            });
        });
    });
    
    //FRIENDSHIP TESTS MUST BE CREATED
    it('POST to api/user creates a new friendship', (done)=>{
        User.countDocuments().then(count =>{
            request(app)
            .post('/api/users/'+user._id+'/friendships')
            .send({userName : 'testUser', password : 'testPassword'})
            .end(()=> {
                User.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });
    
});