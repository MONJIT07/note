'use client';

import React, { useState, useEffect } from 'react';
import BookmarkCard from '@/components/BookmarkCard';
import Modal from '@/components/Modal';
import API_URL from '@/config';

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ url: '', title: '', description: '', tags: '' });
    const [loading, setLoading] = useState(true);

    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/bookmarks?search=${search}`);
            const data = await res.json();
            setBookmarks(data);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchBookmarks();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
            await fetch(`${API_URL}/bookmarks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, tags: tagsArray }),
            });
            setIsModalOpen(false);
            setFormData({ url: '', title: '', description: '', tags: '' });
            fetchBookmarks();
        } catch (error) {
            console.error('Error creating bookmark:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`${API_URL}/bookmarks/${id}`, { method: 'DELETE' });
            fetchBookmarks();
        } catch (error) {
            console.error('Error deleting bookmark:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Bookmarks</h1>
                    <p className="text-slate-400">Save and organize your favorite links.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl transition-all shadow-lg hover:shadow-pink-500/25 font-medium"
                >
                    + New Bookmark
                </button>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                />
                <span className="absolute right-4 top-3.5 text-slate-500">🔍</span>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-800/50 rounded-2xl"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarks.map(bookmark => (
                        <BookmarkCard key={bookmark._id} bookmark={bookmark} onDelete={handleDelete} />
                    ))}
                    {bookmarks.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            No bookmarks found. Add one to get started!
                        </div>
                    )}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Bookmark">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">URL</label>
                        <input
                            type="url"
                            required
                            placeholder="https://example.com"
                            value={formData.url}
                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Title (Optional)</label>
                        <input
                            type="text"
                            placeholder="Auto-fetched if empty"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Description (Optional)</label>
                        <textarea
                            rows={2}
                            placeholder="Optional description"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            placeholder="dev, interesting, news"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg shadow-lg hover:shadow-pink-500/25">Save Bookmark</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
