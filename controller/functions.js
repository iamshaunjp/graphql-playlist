const Author = require('../models/Author')

module.exports = {
    deleteAuthor: async (args) => {
        try {
            return Author.findByIdAndDelete(args.id)
        } catch (e) {
            throw new Error(e.message)
        }
    }
}