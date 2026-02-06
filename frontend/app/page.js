import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 max-w-2xl mx-auto leading-tight">
          Organize Your Digital Life
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          A premium space for your ideas, notes, and internet gems. Simple, beautiful, and distraction-free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <Link href="/notes" className="group">
          <div className="glass-card p-8 rounded-3xl h-full border border-indigo-500/20 hover:border-indigo-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all"></div>

            <div className="relative z-10">
              <span className="text-4xl mb-4 block">📝</span>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Notes</h2>
              <p className="text-slate-400">
                Capture thoughts, ideas, and meeting notes with markdown support and tag organization.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/bookmarks" className="group">
          <div className="glass-card p-8 rounded-3xl h-full border border-pink-500/20 hover:border-pink-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-all"></div>

            <div className="relative z-10">
              <span className="text-4xl mb-4 block">🔖</span>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Bookmarks</h2>
              <p className="text-slate-400">
                Save URLs with automatic metadata fetching. Never lose a useful link again.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
