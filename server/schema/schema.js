const graphql = require("graphql");
const_ = require("lodash")

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

// defined first object type with dif fields
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString}
    })
});

// defined root query, how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }} ,
            resolve(parent, args){
                //code to get data from db / other source
                // book can be store in no sql db or sql db
                return _.find(books, { id: args.id });


            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

// const AuthorType = new GraphQLObjectType({
//     nem: "Author",
//     fields: () => ({
//         id: { type: GraphQLString },
//         name: { type: GraphQLString }
//     })
// })