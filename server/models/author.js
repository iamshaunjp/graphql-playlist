const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('Author', authorSchema);
