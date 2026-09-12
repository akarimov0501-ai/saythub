import React from 'react';
import { Search, Sun, Moon, Send } from 'lucide-react';

export default function Hero({ 
  searchQuery, 
  setSearchQuery, 
  currentFilterCategory, 
  setFilterCategory,
  searchInputRef,
  isDark,
  toggleTheme,
  user,
  onOpenAuth,
  onOpenSubmitModal,
  setTab
}) {
  return (
    <section className="hero-cosmic text-white pt-5 sm:pt-6 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 relative">
      {/* Top Action Controls inside Hero (Desktop/Tablet) */}
      <div className="max-w-7xl mx-auto hidden sm:flex items-center justify-end mb-10 relative z-10">
        <div className="flex items-center gap-3">
          {/* Theme toggle pill */}
          <button 
            onClick={toggleTheme}
            title={isDark ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            className="flex items-center gap-1.5 bg-white/10 border border-white/20 hover:bg-white/20 px-2.5 py-1 rounded-full text-slate-200 transition text-xs active:scale-95 cursor-pointer"
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-sky-300 fill-sky-300/20" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-300 fill-amber-300/20" />
            )}
            <span className="w-px h-3 bg-white/20"></span>
            <span className="text-[11px] text-slate-300 leading-none">✦</span>
          </button>

          {/* Submit Tool Button */}
          <button 
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition active:scale-95 cursor-pointer"
            title="Hamjamiyat bilan yangi foydali saytni ulashing"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Sayt taklif qilish</span>
          </button>

          {/* Sign In / Profile Button */}
          <button 
            onClick={onOpenAuth}
            className="px-4 py-1.5 text-xs font-semibold rounded-full border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            {user ? (
              <>
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {user.avatar || 'U'}
                </div>
                <span className="max-w-[80px] truncate">{user.name}</span>
              </>
            ) : (
              'Kirish'
            )}
          </button>
        </div>
      </div>

      {/* Hero Center Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10 mt-2">
        {/* Handwriting Annotation + Curved Arrow */}
        <div className="absolute -top-6 right-2 sm:-right-8 hidden md:flex flex-col items-center pointer-events-none select-none">
          <span className="font-handwriting text-slate-300 text-xl rotate-3 tracking-wide drop-shadow">
            Foydali internet,<br />yorqin kelajak.
          </span>
          <svg className="w-10 h-10 text-slate-300 mt-1 -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 5 C 25 15, 35 30, 20 45" strokeLinecap="round"/>
            <path d="M14 38 L 20 45 L 28 42" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
          Barcha foydali saytlar<br />
          <span className="text-gradient-hero">bir joyda</span>
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl mx-auto mb-8 leading-relaxed">
          Ishingiz, o'qishingiz va ijodingiz uchun eng sara saytlarni kashf qiling, saqlang va tartiblang.
        </p>

        {/* Floating Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="glass-input rounded-full py-3.5 pl-5 pr-4 flex items-center gap-3 transition">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Saytlar, vositalar yoki toifalarni qidiring..." 
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold transition flex-shrink-0 mr-1 cursor-pointer"
                title="Tozalash"
              >
                ×
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md text-[11px] font-bold flex-shrink-0 select-none">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
