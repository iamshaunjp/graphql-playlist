const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
 
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true 
}));

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Now listening for requests on port 4000.');
});