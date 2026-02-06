const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const noteRoutes = require('./routes/notes');
const bookmarkRoutes = require('./routes/bookmarks');

app.use('/api/notes', noteRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const { MongoMemoryServer } = require('mongodb-memory-server');

// Database Connection
const connectDB = async () => {
    try {
        let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/personal-manager';

        // Try connecting to local MongoDB first
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 })
            .then(() => console.log('MongoDB Connected (Local)'));

    } catch (err) {
        console.log('Local MongoDB not found, starting in-memory MongoDB...');
        try {
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            await mongoose.connect(uri);
            console.log(`MongoDB Connected (In-Memory) at ${uri}`);

            // Optional: Save the URI if needed, but for now we just run with it.
        } catch (memErr) {
            console.error('Failed to start in-memory MongoDB:', memErr);
        }
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
