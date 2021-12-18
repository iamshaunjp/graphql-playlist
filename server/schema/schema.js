const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.js');
const Author = require('../models/author.js')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList
    } = graphql;



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                // return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id})
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
            resolve(parent, args){
                // code to get data from db / other source
                // return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                // return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
