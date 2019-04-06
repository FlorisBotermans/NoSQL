const driver = require('../neo4jdriver');
const User = require('../models/user')

module.exports = {
    createFriendship(req, res, next) {
        const firstUser = req.body.userName1;
        const secondUser = req.body.userName2;
        const User1 = User.findOne({userName : firstUser});
        const User2 = User.findOne({userName: secondUser});

        Promise.all([User1,User2])
        .then(function(values) {
            if(values[0] !== null && values[1] !== null) {
                let session = driver.session();
                session.run(
                    'MATCH (a:User)-[f:FRIENDSHIP]-(b:User) WHERE a.userName = $userName1 AND b.username = $userName2 return f',
                    { userName1: values[0].userName, userName2: values[1].userName }
                ).then(function(result){
                    if(result.records.length === 0) {
                        session.run(//Saves the friendship in Neo4J DB
                            'MATCH (a:User),(b:User) WHERE a.userName = $userName1 AND b.userName = $userName2 CREATE UNIQUE (a)<-[r:IS_FRIENDS_WITH]->(b) RETURN type(r)',
                            { userName1: values[0].userName, userName2: values[1].userName }
                        )
                        .then(function(result){
                            res.status(200).send({ Message: values[0].username + ' is now friends with ' + values[1].username });
                        })
                        .catch(next);
                        session.close();                                                  
                    } 
                    else {
                        res.status(200).send({ Message: values[0].username + ' is now friends with ' + values[1].username });
                    }
                })
            } 
        })     
    },
    
    deleteFriendship(req, res, next) {
        let session = driver.session();

        session.run(
            'MATCH (:User {userName: $userName1})-[r:IS_FRIENDS_WITH]-(:User {userName: $userName2}) DETACH DELETE r',
            {
                userName1: req.body.userName1,
                userName2: req.body.userName2
            }
        )
        .then(() => res.status(200).send())
        .catch(() => {
            res.status(422).send();
            next();
        });
    }
};