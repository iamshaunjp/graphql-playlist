const express = require("express");
// const graphqlHTTP = require("express-graphql").graphqlHTTP;
// require('express-graphql') returns an object with a property called graphqlHTTP that is the function you want to call.
// or :
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");

const app = express();

app.use('/graphql', graphqlHTTP({
    // schema: schema - using ES6: both names are the same, so:
    schema
}));

app.listen(4000, () => {
    console.log("Listening to requests on port 4000");
});