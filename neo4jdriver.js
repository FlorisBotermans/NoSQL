const neo4j = require('neo4j-driver').v1;

let driver;

if(process.env.NODE_ENV == 'testCloud' || process.env.NODE_ENV == 'production') {
    driver = neo4j.driver('bolt://hobby-pojohncofhjngbkeagedbfbl.dbs.graphenedb.com:24786',
        neo4j.auth.basic('neo4j', 'b.qnYTtkjtOd6q.1YohtZfbphGJf0eD'));
} else {
    driver = neo4j.driver('bolt://localhost:7687',
        neo4j.auth.basic('neo4j', '1234'));
}

module.exports = driver;