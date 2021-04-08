const { 
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
 } = require('graphql')

 const Book = require('../../models/Book')
 const { BookType } = require('../books/types')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                console.log(parent)
                return Book.find({ authorId: parent.id })
            }
        }
    })
 })

 module.exports = {
    AuthorType
 }