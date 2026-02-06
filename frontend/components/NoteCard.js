import React from 'react';

export default function NoteCard({ note, onDelete }) {
    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <div className="glass-card p-6 rounded-2xl relative group flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white line-clamp-1">{note.title}</h3>
                <button
                    onClick={() => onDelete(note._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
                >
                    ✕
                </button>
            </div>
            <p className="text-slate-300 mb-4 line-clamp-3 flex-1 text-sm leading-relaxed">
                {note.content}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex gap-2 flex-wrap">
                    {note.tags && note.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                            #{tag}
                        </span>
                    ))}
                </div>
                <span className="text-xs text-slate-500">{formatDate(note.createdAt)}</span>
            </div>
        </div>
    );
}
