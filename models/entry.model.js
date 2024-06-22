const mongoose = require('mongoose')
const EntrySchema = mongoose.Schema(
    {
        sentenceNotSaid: {
            type: String,
            required: [true, "Please enter sentenceNotSaid"]
        },
        thumbsup: {
            type: Number,
            required: [true, "Please enter thumbsup"]
        },
        hashtag: {
            type: String,
            required: [true, "Please enter thumbsdown"]
        },
        date: {
            type: String,
            required: [true, "Please enter date"]
        }
    },
    {
        timestamps: true
    }
)

const Entry = mongoose.model("Entry", EntrySchema);
module.exports = Entry; 