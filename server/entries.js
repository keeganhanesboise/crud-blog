const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create new schema for entries that have a title and description
let Entry = new Schema({
    entry_title: {
        type: String
    },
    entry_description: {
        type: String
    }
});

module.exports = mongoose.model('Entry', Entry);