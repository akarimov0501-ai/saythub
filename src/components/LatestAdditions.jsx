import React from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import BrandIcon from './BrandIcon';

export default function LatestAdditions({ websites = [], favorites, toggleBookmark, setTab, onOpenDetail }) {
  // Show up to 6 latest sites from database
  const latest = (websites && websites.length > 0)
    ? websites.filter(w => w.new).slice(0, 6)
    : [];

  if (latest.length === 0) {
    return null; // Gracefully hide when no recent additions exist yet
  }

  return (
    <section id="latest-section" className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight">So'nggi qo'shilganlar</h3>
        <button 
          onClick={() => setTab('new')} 
          className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-xs sm:text-sm flex items-center gap-1 group transition cursor-pointer"
        >
          Barchasi <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Latest Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {latest.map((item) => {
          const isBookmarked = favorites.includes(item.id);
          return (
            <div 
              key={item.id}
              onClick={() => onOpenDetail ? onOpenDetail(item) : window.open(item.url, '_blank')} 
              className="site-card bg-white dark:bg-slate-900/80 rounded-2xl p-3 flex items-center justify-between group cursor-pointer border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-sky-500/50 shadow-sm hover:shadow transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <BrandIcon type={item.iconType} name={item.name} logoUrl={item.logoUrl} size="small" />
                <div className="truncate">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate block">{item.category}</span>
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(item.id);
                }} 
                className={`p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-850 transition flex-shrink-0 cursor-pointer ${
                  isBookmarked ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60' : ''
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-sky-600 text-sky-600 dark:fill-sky-400 dark:text-sky-400' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
