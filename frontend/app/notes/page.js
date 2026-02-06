'use client';

import React, { useState, useEffect } from 'react';
import NoteCard from '@/components/NoteCard';
import Modal from '@/components/Modal';

export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/notes?search=${search}`);
            const data = await res.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchNotes();
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
            await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, tags: tagsArray }),
            });
            setIsModalOpen(false);
            setFormData({ title: '', content: '', tags: '' });
            fetchNotes();
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:5000/api/notes/${id}`, { method: 'DELETE' });
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Notes</h1>
                    <p className="text-slate-400">Capture your ideas and thoughts.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 font-medium"
                >
                    + New Note
                </button>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <span className="absolute right-4 top-3.5 text-slate-500">🔍</span>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-800/50 rounded-2xl"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map(note => (
                        <NoteCard key={note._id} note={note} onDelete={handleDelete} />
                    ))}
                    {notes.length === 0 && (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            No notes found. Create one to get started!
                        </div>
                    )}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Note">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Content</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            placeholder="ideas, work, personal"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg hover:shadow-indigo-500/25">Save Note</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
