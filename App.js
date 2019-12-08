const express = require('express');
const dotenv = require('dotenv');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
 
const app = express();
dotenv.config({path: __dirname + '/.env'});

mongoose.connect(process.env['DB_URL']);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true 
}));

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Now listening for requests on port 4000.');
});