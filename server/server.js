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

// Environment file with database login
require("dotenv").config({ path: "./config.env" });

// Connect to mongoDB
const database = process.env.ATLAS_URI;
mongoose.connect(database, { useNewUrlParser: true });
const connection = mongoose.connection;

// Check for successful connection
connection.once('open', function() {
    console.log("Successfully connected to DB!");
});

// Check that server ran successfully
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

// Remove blog entry from database
entryRoutes.route('/delete/:id').delete(function(req, res) {
    Entry.findByIdAndRemove(req.params.id, function(err, entry) {
        if (!entry)
            res.status(400).send("entry not found");
        else {
            const response = {
                message: "Successfully deleted entry",
                id: req.params.id
            }
            return res.status(200).send(response);
        }
    });
});