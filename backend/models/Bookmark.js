const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false, // Can be auto-fetched
    },
    description: {
        type: String,
    },
    tags: [String],
    isFavorite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
