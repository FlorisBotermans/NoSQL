const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Thread = mongoose.model('thread');

describe('Comments controller', () => {
    it('POST to api/comments creates a new comment subdocument', done => {
        const thread = new Thread({
            title: 'testTitle',
            content: 'testContent',
            comments: [{ content: 'testContent2' }]
        });

        thread.save()
            .then(() => {
                request(app)
                    .post('/api/threads/' + thread._id + '/comments')
                    .send({ content: 'testContent3' })
                    .end((err, response) => {
                        assert(response.body.content === 'testContent3');
                        done();
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

    it('DELETE to api/comments/commentid deletes a comment subdocument', done => {
        const thread = new Thread({
            title: 'testTitle',
            content: 'testContent',
            comments: [{ _id: '1234', content: 'testContent2' }]
        });

        thread.save()
            .then(() => {
                request(app)
                    .delete('/api/threads/' + thread._id + '/comments/' + thread.comments[0]._id)
                    .end(() => {
                        assert(thread.comments[0] === null);
                        done();
                    });
            });
    });
    //UPVOTE AND DOWNVOTE TEST MUST BE CREATED
    
});