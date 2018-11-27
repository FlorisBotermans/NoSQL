const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Comment = mongoose.model('comment');

describe('Comments controller', ()=> {
    // WORKS 
    it('POST to api/comments creates a new comment', (done)=>{
        Comment.countDocuments().then(count =>{
            request(app)
            .post('/api/users/:userid/threads/:threadid/comments')
            .send({content :'test content'})
            .end(()=> {
                Comment.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });

    it('POST to api/comments creates a comment on an existing comment', (done)=>{
        const comment = new Comment({content: 'content'});

        Comment.countDocuments().then(count =>{
            request(app)
            .post('/api/users/:userid/threads/:threadid/comments/'+comment._id)
            .send({content :'test content'})
            .end(()=> {
                Comment.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });

    it('PUT to api/comments that edits a comment', (done)=>{
        const comment = new Comment({content: 'content'});

        comment.save().then(() =>{
            request(app)
            .put('/api/users/:userid/threads/:threadid/comments/'+comment._id)
            .send({content: 'changedContent'})
            .end(()=> {
                Comment.findOne({content: 'changedContent'})
                .then(comment=>{
                    assert(comment.content === 'changedContent');
                    done();
                });
            });
        });
    });

    // WORKS
    it.only('DELETE to api/comments that deletes a comment', (done)=>{
        const comment = new Comment({content: 'content'});

        comment.save().then(() =>{
            request(app)
            .delete('/api/comments/'+comment._id)
            .end(()=> {
                Comment.findOne({content: 'content'})
                .then((comment)=>{
                    assert(comment === null);
                    done();
                });
            });
        });
    });

    //UPVOTE AND DOWNVOTE TEST MUST BE CREATED
    
});