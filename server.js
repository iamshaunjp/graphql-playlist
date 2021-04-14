const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const schema = require('./schema/schema')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}))

app.listen(4000, e => {
    if (e) return console.error(e)
    console.log('Server Listenning on port 4000')
})