const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

//dummy data
var books = [
  { name: 'Night', genre: 'Non-Fiction', id: '1', authorID: '1' },
  { name: 'Chronicles of Narnia', genre: 'Fantasy', id: '2', authorID: '2' },
  { name: 'The City & The City', genre: 'Mystery', id: '3', authorID: '3' },
  { name: 'The Four Loves', genre: 'Fantasy', id: '4', authorID: '2' },
  { name: 'King Rat', genre: 'Mystery', id: '3', authorID: '3' },
  { name: 'Dawn', genre: 'Non-Fiction', id: '1', authorID: '1' }
];

const authors =  [
  {name: 'Elie Wiesel', age: 91, id:'1'},
  {name: 'C.S. Lewis', age: 121, id:'2'},
  {name: 'China Miéville', age: 47, id:'3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return _.find(authors, {id: parent.authorID});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return _.filter(books, { authorID: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from database or other source!
        return _.find(books, { id: args.id }); // replace this with ES6's .find later
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

// pick up at lesson 15