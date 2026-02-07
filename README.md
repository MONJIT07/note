# Personal Notes & Bookmark Manager

A premium, full-stack application to manage your notes and bookmarks with automatic metadata fetching.

![Project Preview](https://via.placeholder.com/800x400?text=Premium+Design+Preview) (Replace with real screenshot)

## 🚀 Live Demo
**[Live App (Frontend)](https://melodic-buttercream-6a8812.netlify.app/)**

## 🛠️ Tech Stack
- **Frontend**: Next.js 16, Tailwind CSS (v4), Glassmorphism UI
- **Backend**: Node.js, Express.js, Cheerio (Metadata fetching)
- **Database**: MongoDB (In-memory for dev, Atlas for prod)

## ✨ Features
- **Notes**: Create, edit, search, and tag markdown-style notes.
- **Bookmarks**: Save links with **automatic title & description fetching**.
- **Search**: Real-time filtering by text or tags.
- **Design**: Modern glassmorphism aesthetics with dark mode.


```
*Note: Uses in-memory MongoDB by default. To persist data, create a `.env` file with `MONGO_URI`.*

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```
