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
  HelpCircle
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
                const sec = document.getElementById('featured-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentTab === 'popular' && currentFilterCategory === 'all'
                  ? 'bg-sky-50 text-sky-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
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
                setTab('collections');
                const sec = document.getElementById('featured-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                closeMobileSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentTab === 'collections'
                  ? 'bg-sky-50 text-sky-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentTab === 'new'
                  ? 'bg-sky-50 text-sky-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
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
                  setTab('collections');
                  const sec = document.getElementById('featured-section');
                  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  closeMobileSidebar();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === 'collections'
                    ? 'bg-sky-50 text-sky-600 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-400" />
                My Collection
              </button>

              <button
                onClick={() => {
                  setTab('favorites_only');
                  const sec = document.getElementById('featured-section');
                  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                  closeMobileSidebar();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === 'favorites_only'
                    ? 'bg-sky-50 text-sky-600 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
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

        {/* User Profile Bottom with interactive Menu */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative">
          <div 
            onClick={openAuthModal}
            className="flex items-center gap-3 cursor-pointer group flex-1 mr-2 p-1 rounded-xl hover:bg-slate-50 transition"
            title="Profil sozlamalari"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              {user ? (user.avatar || 'U') : 'MA'}
            </div>
            <div className="truncate">
              <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-sky-600 transition-colors truncate">
                {user ? user.name : 'MA Studio'}
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">
                {user ? (user.role || 'Member') : 'Free Plan'}
              </span>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className={`text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition ${
                isProfileMenuOpen ? 'bg-slate-100 text-slate-800' : ''
              }`}
              title="Qo'shimcha amallar"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl py-1.5 z-50 text-xs font-semibold animate-toast">
                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700"
                >
                  <User className="w-4 h-4 text-sky-500" />
                  {user ? "Mening profilim" : "Tizimga kirish"}
                </button>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    openCreateModal();
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700"
                >
                  <Plus className="w-4 h-4 text-indigo-500" />
                  Sayt yoki to'plam qo'shish
                </button>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (toggleTheme) toggleTheme();
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-700"
                >
                  <Moon className="w-4 h-4 text-amber-500" />
                  Mavzuni almashtirish
                </button>

                <div className="my-1 border-t border-slate-100"></div>

                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    if (triggerToast) triggerToast("LinkHub v2.0 • Barcha saytlar bir joyda", 'ℹ');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-slate-500"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  LinkHub haqida
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
