const Entry = require('../models/entry.model')

const getEntries = async (req, res) => {
    try {
        const entries = await Entry.find({});
        res.status(200).json(entries)
    } catch (error) {
        console.error('Error creating entry:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
}

// Add an entry
const addEntry = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log request body
        const entry = await Entry.create(req.body);
        res.status(200).json({ message: 'entry created successfully' });
    } catch (error) {
        console.error('Error creating entry:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// update API
const updateEntry =  async (req, res) => {
    try {
        const { id } = req.params; // Correct typo
        const updateData = req.body; // Get update data from the request body
        const entry = await Entry.findByIdAndUpdate(id, updateData, { new: true }); // Pass update data and use the 'new' option to return the updated document

        if (!entry) {
            return res.status(404).json({ message: "entry not found" });
        }

        res.status(200).json(entry); // Return the updated entry

    } catch (error){
        console.error('Error creating entry:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// delete an entry
const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Entry.findByIdAndDelete(id);
        
        if (!entry) {
            return res.status(404).json({ message: "entry not found" });
        }

        res.status(200).json({ message: "entry deleted successfully" });
    } catch (error) {
        console.error('Error deleting entry:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEntries,
    updateEntry,
    addEntry,
    deleteEntry
}