const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const entryRoutes = express.Router();
const PORT = 4000;

let Entry = require('./entries');

app.use(cors());
app.use(bodyParser.json());
app.use('/entries', entryRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/entries', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Successfully connected to DB!");
});

app.listen(PORT, function() {
    console.log("Keegan's Blog is running on Port: " + PORT);
});

// Retreive all entries from DB
entryRoutes.route('/').get(function(req, res) {
    Entry.find(function(err, entries) {
        if (err) {
            console.log(err);
        } else {
            res.json(entries);
        }
    });
});

// Retreive specific entry by ID from DB 
entryRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Entry.findById(id, function(err, entry) {
        res.json(entry);
    });
});

// Add new blog entry to DB
entryRoutes.route('/new').post(function(req, res) {
    let entry = new Entry(req.body);
    entry.save()
        .then(entry => {
            res.status(200).json({'entry': 'entry added successfully'});
        })
        .catch(err => {
            res.status(400).send('failed to add entry');
        });
});

// Update existing blog entry in DB
entryRoutes.route('/edit/:id').post(function(req, res) {
    Entry.findById(req.params.id, function(err, entry) {
        if (!entry)
            res.status(400).send("entry not found");
        else
            entry.entry_title = req.body.entry_title;
            entry.entry_description = req.body.entry_description;

            entry.save().then(entry => {
                res.json("entry has been updated");
            })
            .catch(err => {
                res.status(400).send("failed to edit entry");
            });
    });
});

// ADD END POINT FOR DELETING ENTRY HERE
// Remove blog entry from database