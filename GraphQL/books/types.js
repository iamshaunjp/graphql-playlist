const { 
    GraphQLID,
    GraphQLObjectType,
    GraphQLString
 } = require('graphql')

const Author = require('../../models/Author')
const { AuthorType } = require('../authors/types')

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                console.log(parent)
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId)
            }
        }
    })
 })

 module.exports = {
     BookType
 }

