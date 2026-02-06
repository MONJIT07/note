import React from 'react';

export default function BookmarkCard({ bookmark, onDelete }) {
    const formatDate = (date) => new Date(date).toLocaleDateString();
    const domain = new URL(bookmark.url).hostname.replace('www.', '');

    return (
        <div className="glass-card p-6 rounded-2xl relative group flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                        alt="favicon"
                        className="w-4 h-4 rounded-sm opacity-70"
                    />
                    <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">{domain}</span>
                </div>
                <button
                    onClick={() => onDelete(bookmark._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
                >
                    ✕
                </button>
            </div>

            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block mb-3 hover:text-indigo-400 transition-colors">
                <h3 className="text-lg font-semibold text-white line-clamp-1">{bookmark.title || bookmark.url}</h3>
            </a>

            <p className="text-slate-400 mb-4 line-clamp-2 flex-1 text-sm">
                {bookmark.description || "No description available."}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex gap-2 flex-wrap">
                    {bookmark.tags && bookmark.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/20">
                            #{tag}
                        </span>
                    ))}
                </div>
                <span className="text-xs text-slate-500">{formatDate(bookmark.createdAt)}</span>
            </div>
        </div>
    );
}
