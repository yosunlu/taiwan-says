const express = require('express');
const router = express.Router();
const {getEntries, updateEntry, addEntry, deleteEntry} = require('../controllers/entry.controller.js');

// Get all entries
router.get('/', getEntries);

// Add an entry
router.post('/', addEntry);

// update API
router.put('/:id', updateEntry);

// delete an entry
router.delete('/:id', deleteEntry);

module.exports = router