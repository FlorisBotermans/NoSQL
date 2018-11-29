const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const driver = require('../../neo4jdriver')

describe('Friendships controller', ()=>{
    it('POST to api/friendship creates a new friendship', done => {
        const name1 = 'jan';
        const name2 = 'piet';
        let session = driver.session();
    
        session.run(
            'MATCH (a:User),(b:User) WHERE a.userName = $userName1 AND b.userName = $userName2 CREATE (a)-[r:IS_FRIENDS_WITH]->(b) RETURN type(r)',
            {
                userName1 : name1,
                userName2: name2
            })
            .then(()=> {
                return session.run('MATCH (a:User),(b:User) WHERE a.userName = $userName1 AND b.userName = $userName2 CREATE (a)-[r:IS_FRIENDS_WITH]->(b) RETURN type(r)',
                {
                    userName1 : name1,
                    userName2: name2
                })
            })
            .then((result) => {
                const single = result.records[0];
                const node = single.get(0);
                assert(
                    name1 === node.properties.userName1,
                    name2 === node.properties.userName2
                    );
                session.close();
                done();
            })
            .catch((err)=>{
                session.close();
                done(err)
            })
    });
});