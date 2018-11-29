const neo4j = require('neo4j-driver').v1;

let driver;

driver = neo4j.driver('bolt://hobby-pojohncofhjngbkeagedbfbl.dbs.graphenedb.com:24786',
    neo4j.auth.basic('admin', 'b.LoxWQUS7uCli.fqqDfp8E8zMouFRE'));

module.exports = driver;