import React, { useState } from 'react';
import { Search, ChevronDown, Sun, Moon, Send } from 'lucide-react';

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
  const [activeNav, setActiveNav] = useState('discover');
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const quickTags = [
    { label: 'AI', value: 'AI' },
    { label: 'Design', value: 'Design' },
    { label: 'Development', value: 'Development' },
    { label: 'Productivity', value: 'Productivity' },
    { label: 'Education', value: 'Education' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: '···', value: 'all' }
  ];

  const handleNavClick = (navId, catFilter) => {
    setActiveNav(navId);
    setFilterCategory(catFilter);
    setIsMoreOpen(false);
    if (navId === 'discover') {
      if (setTab) setTab('popular');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const sec = document.getElementById('featured-section');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-cosmic text-white pt-6 pb-12 px-4 sm:px-8 lg:px-12 relative">
      {/* Top Navigation Bar inside Hero */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-12 relative z-10">
        <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-slate-300 relative">
          <button 
            onClick={() => handleNavClick('discover', 'all')}
            className={`transition relative pb-0.5 ${
              activeNav === 'discover' 
                ? 'text-white font-bold after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full' 
                : 'hover:text-white'
            }`}
          >
            Discover
          </button>

          <button 
            onClick={() => handleNavClick('tools', 'Productivity')}
            className={`transition relative pb-0.5 ${
              activeNav === 'tools' 
                ? 'text-white font-bold after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full' 
                : 'hover:text-white'
            }`}
          >
            Tools
          </button>

          <button 
            onClick={() => handleNavClick('inspiration', 'Design')}
            className={`transition relative pb-0.5 ${
              activeNav === 'inspiration' 
                ? 'text-white font-bold after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full' 
                : 'hover:text-white'
            }`}
          >
            Inspiration
          </button>

          <button 
            onClick={() => handleNavClick('learn', 'Education')}
            className={`transition relative pb-0.5 ${
              activeNav === 'learn' 
                ? 'text-white font-bold after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full' 
                : 'hover:text-white'
            }`}
          >
            Learn
          </button>

          <button 
            onClick={() => handleNavClick('build', 'Development')}
            className={`transition relative pb-0.5 ${
              activeNav === 'build' 
                ? 'text-white font-bold after:content-[\'\'] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full' 
                : 'hover:text-white'
            }`}
          >
            Build
          </button>

          {/* More Dropdown Menu */}
          <div className="relative">
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center gap-1 hover:text-white transition pb-0.5"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isMoreOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl py-1 z-30 animate-toast">
                <button 
                  onClick={() => handleNavClick('more_ai', 'AI')}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
                >
                  ⚡ AI Tools
                </button>
                <button 
                  onClick={() => handleNavClick('more_finance', 'Finance')}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
                >
                  💰 Finance
                </button>
                <button 
                  onClick={() => handleNavClick('more_entertainment', 'Entertainment')}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
                >
                  🎬 Entertainment
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          {/* Search trigger */}
          <button 
            onClick={() => searchInputRef.current?.focus()}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <Search className="w-4 h-4" />
          </button>
          
          {/* Theme toggle pill */}
          <button 
            onClick={toggleTheme}
            title={isDark ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            className="flex items-center gap-1.5 bg-white/10 border border-white/20 hover:bg-white/20 px-2.5 py-1 rounded-full text-slate-200 transition text-xs active:scale-95"
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
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition active:scale-95"
            title="Hamjamiyat bilan yangi foydali saytni ulashing"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit Tool</span>
            <span className="sm:hidden">Taklif</span>
          </button>

          {/* Sign In / Profile Button */}
          <button 
            onClick={onOpenAuth}
            className="px-4 py-1.5 text-xs font-semibold rounded-full border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition flex items-center gap-2 active:scale-95"
          >
            {user ? (
              <>
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {user.avatar || 'U'}
                </div>
                <span className="max-w-[80px] truncate">{user.name}</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </div>

      {/* Hero Center Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10 mt-4">
        {/* Handwriting Annotation + Curved Arrow */}
        <div className="absolute -top-6 right-2 sm:-right-8 hidden md:flex flex-col items-center pointer-events-none select-none">
          <span className="font-handwriting text-slate-300 text-xl rotate-3 tracking-wide drop-shadow">
            A better web,<br />a brighter you.
          </span>
          <svg className="w-10 h-10 text-slate-300 mt-1 -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 5 C 25 15, 35 30, 20 45" strokeLinecap="round"/>
            <path d="M14 38 L 20 45 L 28 42" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
          All Useful Websites<br />
          in <span className="text-gradient-hero">One Place</span>
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl mx-auto mb-8 leading-relaxed">
          Discover, save and organize the best websites for your work, study and creativity.
        </p>

        {/* Floating Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="glass-input rounded-full py-3.5 pl-5 pr-4 flex items-center gap-3 transition">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input 
              ref={searchInputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search websites, tools, or categories..." 
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
            />
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md text-[11px] font-bold flex-shrink-0 select-none">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Category Tags Below Search */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-medium">
          {quickTags.map((tag, idx) => {
            const isActive = currentFilterCategory.toLowerCase() === tag.value.toLowerCase();
            return (
              <button 
                key={idx}
                onClick={() => {
                  const targetVal = tag.value === currentFilterCategory ? 'all' : tag.value;
                  setFilterCategory(targetVal);
                  const sec = document.getElementById('featured-section');
                  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`glass-pill px-3.5 py-1.5 rounded-full transition-all ${
                  isActive ? 'bg-white/30 text-white border-white/50 shadow-sm' : ''
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
