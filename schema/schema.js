const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
 } = require('graphql')
 //const _ = require('lodash')

 const Book = require('../models/Book')
 const Author = require('../models/Author')

 const { deleteAuthor } = require('../controller/functions')
//  const books = [
//     { id: '1', name: 'Name of the wind', genre: 'Fantasy', authorId: '1' },
//     { id: '2', name: 'The Final Empire', genre: 'Fantasy', authorId: '2' },
//     { id: '3', name: 'The Long Earth', genre: 'Sci-Fi', authorId: '3' },
//     { id: '4', name: 'The Hero of Ages', genre: 'Sci-Fi', authorId: '2' },
//     { id: '5', name: 'The Colour of Magic', genre: 'Fantasy', authorId: '3' },
//     { id: '6', name: 'The Light Fantastic', genre: 'Fantasy', authorId: '3' }
//  ]
//  const authors = [
//     { id: '1', name: 'Patrick Rothfuss', age: 44 },
//     { id: '2', name: 'Brandon Sanderson', age: 47 },
//     { id: '3', name: 'Terry Pratchett', age: 66 }
//  ]

 const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
            }
        }
    })
 })

 const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                // return _.filter(books, { authorId: parent.id })
                return Book.find({ authorId: parent.id })
            }
        }
    })
 })

 const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                // return _.find(books, { id: args.id })
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                // return authors
                return Author.find({})
            }
        }
    }
 })

 const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBooks: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLString },
                authorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                try {
                    const { name, genre, authorId } = args
                    if (!name || !genre || !authorId) throw new Error('All fields required')

                    const book = new Book({
                        name,
                        genre,
                        authorId
                    })
                    return book.save()
                } catch (e) {
                    throw new Error(e.message)
                }
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                try {
                    const { name, age } = args
                    if (!name || !age) throw new Error('All fields required')

                    const author = new Author({ name, age })
                    return author.save()
                } catch (e) {
                    throw new Error(e.message)
                }
            }
        },
        delAuthor: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                deleteAuthor(args)
            }
        }
    }
 })


 module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
 })