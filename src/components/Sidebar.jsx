import React from 'react';
import { 
  Home, 
  Compass, 
  LayoutGrid, 
  FolderArchive, 
  Heart, 
  Clock, 
  FileText, 
  Bookmark, 
  Folder, 
  Sparkles, 
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setTab, 
  currentFilterCategory, 
  setFilterCategory, 
  favoritesCount, 
  openCreateModal,
  isMobileOpen,
  closeMobileSidebar,
  onOpenAdmin
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`w-64 lg:w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between p-5 fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-500 p-0.5 flex items-center justify-center shadow-md shadow-sky-500/10">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-pink-500 flex items-center justify-center text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg tracking-tight leading-tight">
                LinkHub
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">All useful sites in one place</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => {
                setTab('popular');
                setFilterCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentTab !== 'favorites_only' && currentFilterCategory === 'all'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => {
                setTab('popular');
                setFilterCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Compass className="w-4 h-4" />
              Explore
            </button>

            <a
              href="#categories-section"
              onClick={closeMobileSidebar}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Categories
            </a>

            <button
              onClick={() => {
                setTab('popular');
                closeMobileSidebar();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <FolderArchive className="w-4 h-4" />
              Collections
            </button>

            <button
              onClick={() => {
                setTab('favorites_only');
                setFilterCategory('all');
                const sec = document.getElementById('featured-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentTab === 'favorites_only'
                  ? 'bg-sky-50 text-sky-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-4 h-4 ${currentTab === 'favorites_only' ? 'fill-sky-600' : ''}`} />
                Favorites
              </div>
              {favoritesCount > 0 && (
                <span className="text-xs bg-sky-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setTab('new');
                const sec = document.getElementById('featured-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Recently Added
            </button>
          </nav>

          {/* My Space Section */}
          <div className="pt-2">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              My Space
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setTab('popular');
                  closeMobileSidebar();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                My Collection
              </button>

              <button
                onClick={() => {
                  setTab('favorites_only');
                  closeMobileSidebar();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Bookmark className="w-4 h-4 text-slate-400" />
                Saved Links
              </button>

              <button
                onClick={() => {
                  openCreateModal();
                  closeMobileSidebar();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Folder className="w-4 h-4 text-slate-400" />
                Custom Folders
              </button>
            </div>
          </div>

          {/* Promotional Card: Organize the web you love */}
          <div className="sidebar-cta-card rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-sky-400 mb-3 shadow-inner">
              <Sparkles className="w-4 h-4 animate-subtle-pulse" />
            </div>
            <h4 className="font-bold text-[15px] leading-snug mb-1">Organize the web you love.</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3.5">
              Save, sort and access your favorite websites — faster.
            </p>
            <button
              onClick={() => {
                openCreateModal();
                closeMobileSidebar();
              }}
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm group"
            >
              Create Collection
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* User Profile Bottom */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div 
            onClick={onOpenAdmin}
            className="flex items-center gap-3 cursor-pointer group flex-1"
            title="Open Admin Console"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm group-hover:ring-2 group-hover:ring-blue-400 transition">
              MA
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition">MA Studio</h4>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                Admin Console →
              </span>
            </div>
          </div>
          <button 
            onClick={onOpenAdmin}
            title="Open Admin Panel"
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </aside>
    </>
  );
}
