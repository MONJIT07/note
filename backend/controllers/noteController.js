const Note = require('../models/Note');

// Get all notes with optional search and tag filtering
exports.getNotes = async (req, res) => {
    try {
        const { search, tags } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        if (tags) {
            const tagList = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagList };
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and Content are required' });
        }
        const newNote = new Note({ title, content, tags });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
