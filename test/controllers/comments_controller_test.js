const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Thread = mongoose.model('thread');
const Comment = mongoose.model('comment');

describe('Comments controller', () => {
    it('POST to api/comments creates a new comment', done => {
        Comment.countDocuments().then(count => {
            request(app)
                .post('/api/users/:userid/threads/:threadid/comments')
                .send({ content: 'testContent' })
                .end(() => {
                    Comment.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    // it('POST to api/comments creates a comment on an existing comment', done => {
    //     const comment = new Comment({ content: 'content' });

    //     Comment.countDocuments().then(count => {
    //         request(app)
    //         .post('/api/users/:userid/threads/:threadid/comments/' + comment._id)
    //         .send({content: 'test content'})
    //         .end(() => {
    //             Comment.countDocuments().then(newCount => {
    //                 assert(count + 1 === newCount);
    //                 done();
    //             });
    //         });
    //     });
    // });

    it('DELETE to api/comments/commentid deletes a comment', done => {
        const thread = new Thread({ title: 'testTitle', content: 'testContent' })
        const comment = new Comment({ content: 'testContent' });

        Promise.all([thread.save(), comment.save()]).then(() => {
            request(app)
                .delete('/api/threads/' + thread._id + '/comments/' + comment._id)
                .end(() => {
                    Comment.findOne({ content: 'testContent' })
                        .then(comment => {
                            assert(comment === null);
                            done();
                        });
                });
        });
    });
    //UPVOTE AND DOWNVOTE TEST MUST BE CREATED
    
});