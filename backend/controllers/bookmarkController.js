const Bookmark = require('../models/Bookmark');
const axios = require('axios');
const cheerio = require('cheerio');

// Helper to fetch metadata
const fetchMetadata = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text() || $('meta[property="og:title"]').attr('content') || url;
        const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
        return { title, description };
    } catch (error) {
        console.error('Error fetching metadata:', error.message);
        return { title: url, description: '' }; // Fallback
    }
};

exports.getBookmarks = async (req, res) => {
    try {
        const { search, tags } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { url: { $regex: search, $options: 'i' } },
            ];
        }

        if (tags) {
            const tagList = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagList };
        }

        const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBookmarkById = async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
        res.json(bookmark);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBookmark = async (req, res) => {
    try {
        const { url, title, description, tags } = req.body;
        if (!url) return res.status(400).json({ message: 'URL is required' });

        let finalTitle = title;
        let finalDescription = description;

        // Auto-fetch if title is missing
        if (!finalTitle) {
            const metadata = await fetchMetadata(url);
            finalTitle = metadata.title;
            if (!finalDescription) finalDescription = metadata.description;
        }

        const newBookmark = new Bookmark({
            url,
            title: finalTitle,
            description: finalDescription,
            tags
        });
        const savedBookmark = await newBookmark.save();
        res.status(201).json(savedBookmark);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateBookmark = async (req, res) => {
    try {
        const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBookmark) return res.status(404).json({ message: 'Bookmark not found' });
        res.json(updatedBookmark);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBookmark = async (req, res) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
        if (!deletedBookmark) return res.status(404).json({ message: 'Bookmark not found' });
        res.json({ message: 'Bookmark deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
