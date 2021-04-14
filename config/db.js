const mongoose = require('mongoose')
const { MONGO_URL } = require('./keys')

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to DB!')
    } catch (e) {
        console.error(`Error occured while connecting to a DB: ${e}`)
    }
}