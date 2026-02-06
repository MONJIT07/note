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

## 📦 Deployment Guide

Since this repository contains both a `backend` and `frontend`, they should be deployed separately.

### 1. Deploy Backend (Node.js) on Render.com (Free)
1. Fork/Clone this repo.
2. Sign up at [Render.com](https://render.com).
3. Create a **New Web Service**.
4. Connect your GitHub repo.
5. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB Atlas Connection String
     - `PORT`: `5000` (or leave default)
6. **Deploy**. Copy the provided URL (e.g., `https://my-backend.onrender.com`).

### 2. Deploy Frontend (Next.js) on Vercel (Free)
1. Sign up at [Vercel.com](https://vercel.com).
2. **Add New Project** -> Import your GitHub repo.
3. **Settings**:
   - **Root Directory**: `frontend` (Edit the root directory setting).
   - **Environment Variables**:
     - `NEXT_PUBLIC_API_URL`: The Backend URL from Step 1 (e.g., `https://my-backend.onrender.com/api`).
4. **Deploy**.

## 💻 Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```
*Note: Uses in-memory MongoDB by default. To persist data, create a `.env` file with `MONGO_URI`.*

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```
