import React, { useState } from 'react';
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
  ArrowRight,
  User,
  Plus,
  Moon,
  HelpCircle,
  Send,
  X
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setTab, 
  currentFilterCategory, 
  setFilterCategory, 
  favoritesCount, 
  openCreateModal,
  openSubmitModal,
  isMobileOpen,
  closeMobileSidebar,
  user,
  openAuthModal,
  toggleTheme,
  triggerToast
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`w-64 lg:w-72 bg-white dark:bg-[#0a0f1d] border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between p-5 fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-500 p-0.5 flex items-center justify-center shadow-md shadow-sky-500/10 flex-shrink-0">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-pink-500 flex items-center justify-center text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight leading-tight">
                  LinkHub
                </h1>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">All useful sites in one place</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={closeMobileSidebar}
              className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Menyuni yopish"
            >
              <X className="w-5 h-5" />
            </button>
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentTab !== 'favorites_only' && currentFilterCategory === 'all'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => {
                setTab('popular');
                setFilterCategory('all');
                const sec = document.getElementById('featured-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'popular' && currentFilterCategory === 'all'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore
            </button>

            <a
              href="#categories-section"
              onClick={closeMobileSidebar}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Categories
            </a>

            <button
              onClick={() => {
                setTab('collections');
                const sec = document.getElementById('featured-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'collections'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
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
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'favorites_only'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-4 h-4 ${currentTab === 'favorites_only' ? 'fill-sky-600 text-sky-600 dark:fill-sky-400 dark:text-sky-400' : ''}`} />
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'new'
                  ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              Recently Added
            </button>
          </nav>

          {/* My Space Section */}
          <div className="pt-2">
            <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
              My Space
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setTab('collections');
                  const sec = document.getElementById('featured-section');
                  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  closeMobileSidebar();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentTab === 'collections'
                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                My Collection
              </button>

              <button
                onClick={() => {
                  setTab('favorites_only');
                  const sec = document.getElementById('featured-section');
                  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  closeMobileSidebar();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentTab === 'favorites_only'
                    ? 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400 dark:border dark:border-sky-500/30 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                Saved Links
              </button>

              <button
                onClick={() => {
                  openCreateModal();
                  closeMobileSidebar();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Folder className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                Custom Folders
              </button>

              <button
                onClick={() => {
                  openSubmitModal();
                  closeMobileSidebar();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                Sayt taklif qilish
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
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm group cursor-pointer"
            >
              Create Collection
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* User Profile Bottom with interactive Menu */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between relative">
          <div 
            onClick={openAuthModal}
            className="flex items-center gap-3 cursor-pointer group flex-1 mr-2 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition min-w-0"
            title="Profil sozlamalari"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm flex-shrink-0">
              {user ? (user.avatar || 'U') : 'MA'}
            </div>
            <div className="truncate min-w-0">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                {user ? user.name : 'MA Studio'}
              </h4>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium truncate block">
                {user ? (user.role || 'Member') : 'Free Plan'}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex-shrink-0 cursor-pointer ${
              isProfileMenuOpen ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' : ''
            }`}
            title="Qo'shimcha amallar"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Profile Menu Popup - Fully inside sidebar width, no clipping! */}
          {isProfileMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 text-xs font-semibold animate-toast space-y-0.5">
                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  <User className="w-4 h-4 text-sky-500" />
                  {user ? "Mening profilim" : "Tizimga kirish"}
                </button>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    openCreateModal();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-indigo-500" />
                  Sayt yoki to'plam qo'shish
                </button>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    openSubmitModal();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-200 font-semibold transition cursor-pointer"
                >
                  <Send className="w-4 h-4 text-sky-500" />
                  Sayt taklif qilish (Submit Tool)
                </button>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (toggleTheme) toggleTheme();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                >
                  <Moon className="w-4 h-4 text-amber-500" />
                  Mavzuni almashtirish
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (triggerToast) triggerToast("LinkHub v2.0 • Barcha saytlar bir joyda", 'ℹ');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 text-slate-500 dark:text-slate-400 transition cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  LinkHub haqida
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
