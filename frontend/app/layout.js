import "./globals.css";
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal Manager',
  description: 'Manage your notes and bookmarks efficiently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
          {/* Sidebar / Navbar */}
          <aside className="w-64 hidden md:flex flex-col glass border-r border-white/10 h-full p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-gradient">
                BrainSpace
              </h1>
            </div>

            <nav className="flex-1 space-y-2">
              <NavLink href="/" icon="Home">Dashboard</NavLink>
              <NavLink href="/notes" icon="FileText">Notes</NavLink>
              <NavLink href="/bookmarks" icon="Bookmark">Bookmarks</NavLink>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
              <p className="text-xs text-slate-500">v1.0.0</p>
            </div>
          </aside>

          {/* Mobile Nav would go here (simplified for now) */}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function NavLink({ href, children, icon }) {
  // Simple icon placeholder, in real app use Lucide or similar
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5 hover:text-white text-slate-400 font-medium group">
      <span className="group-hover:text-indigo-400 transition-colors">{icon === 'Home' ? '🏠' : icon === 'FileText' ? '📝' : '🔖'}</span>
      {children}
    </Link>
  )
}
