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
});