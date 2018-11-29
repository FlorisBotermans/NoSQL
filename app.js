const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://admin:Secret123@ds044979.mlab.com:44979/studdit', { useNewUrlParser: true });
    console.log('Connected to studdit database')
}

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;