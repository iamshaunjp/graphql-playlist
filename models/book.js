const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorID: String
});

module.exports = mongoose.mode('Book', bookSchema);