const driver = require('../neo4jdriver');

module.exports = {
    createFriendship(req, res, next) {
        let session = driver.session();

        session.run(
            'MATCH (a:User),(b:User) WHERE a.userName = $userName1 AND b.userName = $userName2 CREATE (a)-[r:IS_FRIENDS_WITH]->(b) RETURN type(r)',
            {
                userName1: req.body.userName1,
                userName2: req.body.userName2
            }
        )
        .then(() => res.send(req.body))
        .catch(() => {
            res.status(204).send();
            session.close();
            next();
        });
    },
    
    deleteFriendship(req, res, next) {
        let session = driver.session();

        session.run(
            
        )
    }
};