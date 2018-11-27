const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Thread = mongoose.model('thread');

describe('Thread controller', ()=> {
    it('POST to api/threads creates a new thread', (done)=>{
        Thread.countDocuments().then(count =>{
            request(app)
            .post('/api/users/:userid/threads')
            .send({title: 'title', content: 'content'})
            .end(()=> {
                Thread.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });

    //GET TESTS
    it('GET to api/threads retrieves all threads', (done)=>{
        const thread =  new Thread({title: 'title', content: 'content'});

        thread.save().then(() =>{
            request(app)
            .get('/api/users/:userid/threads')
            .send({})
            .end(()=> {
                done();
            });
        });
    });

    it('GET to api/threads retrieves a specific thrad', (done)=>{
        const thread =  new Thread({title: 'title', content: 'content'});

        thread.save().then(() =>{
            request(app)
            .get('/api/users/:userid/threads/'+ thread._id)
            .send({})
            .end(()=> {
                done();
                
            });
        });
    });

    it('PUT to api/threads that edits a thread content', (done)=>{
        const thread =  new Thread({title: 'title', content: 'content'});

        thread.save().then(() =>{
            request(app)
            .put('/api/users/:userid/threads/'+thread._id)
            .send({content: 'changedContent'})
            .end(()=> {
                Thread.findOne({title: 'testUser'})
                .then(thread=>{
                    assert(thread.title === 'title');
                    done();
                });
            });
        });
    });

    it('DELETE to api/user that deletes a user', (done)=>{
        const thread =  new Thread({title: 'title', content: 'content'});

        thread.save().then(() =>{
            request(app)
            .delete('/api/users/:userid/threads/'+thread._id)
            .end(()=> {
                Thread.findOne({title: 'title'})
                .then((thread)=>{
                    assert(thread === null);
                    done();
                });
            });
        });
    });

    //UPVOTE AND DOWNVOTE MUST BE CREATED
    
});