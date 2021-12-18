const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://povigard:turock5209%23%23@cluster0.p8p18.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to database');
})
// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
