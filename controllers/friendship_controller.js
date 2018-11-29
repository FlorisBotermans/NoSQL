const driver = require('../neo4jdriver');

module.exports = {
    createFriendship(req, res, next) {
        let session = driver.session();

        session.run(
            'MATCH (a:User),(b:User) WHERE a.userName = ' + req.body.userName1 + ' AND b.userName = ' + req.body.userName2 + ' CREATE (a)-[r:IS_FRIENDS_WITH]->(b) RETURN type(r)'
        )
        .then(() => res.status(200).send())
        .catch(() => {
            res.status(204).send();
            session.close();
            next();
        });
    },
    
    deleteFriendship(req, res, next) {
        // MUST BE CREATED WITH NEO4J
    }
};