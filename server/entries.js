const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entry = new Schema({
    entry_title: {
        type: String
    },
    entry_description: {
        type: String
    }
});

module.exports = mongoose.model('Entry', Entry);