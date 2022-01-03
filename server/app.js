const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://sa:user12345678@cluster0-eba0o.mongodb.net/graphql-playlist?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.use(cors())
app.options('*', cors());
app.use(cors({ origin: `http://localhost:3000` }))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
