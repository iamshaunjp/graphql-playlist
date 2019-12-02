const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
  { name: 'Night', genre: 'Non-Fiction', id: '1' },
  { name: 'Chronicles of Narnia', genre: 'Fantasy', id: '2' },
  { name: 'The City & The City', genre: 'Mystery', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from database or other source!
        return _.find(books, { id: args.id }); // replace this with ES6's .find later
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});