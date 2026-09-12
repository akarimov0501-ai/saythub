import React from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import BrandIcon from './BrandIcon';
import { latestAdditions } from '../data/websites';

export default function LatestAdditions({ favorites, toggleBookmark, setTab }) {
  return (
    <section id="latest-section" className="pt-2">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-extrabold text-slate-900 text-xl">Latest Additions</h3>
        <button 
          onClick={() => setTab('new')} 
          className="text-sky-600 hover:text-sky-700 font-semibold text-xs sm:text-sm flex items-center gap-1 group"
        >
          View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Latest Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {latestAdditions.map((item) => {
          const isBookmarked = favorites.includes(item.id);
          return (
            <div 
              key={item.id}
              onClick={() => window.open(item.url, '_blank')} 
              className="site-card bg-white rounded-2xl p-3 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <BrandIcon type={item.iconType} name={item.name} size="small" />
                <div className="truncate">
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors leading-tight truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium truncate block">{item.category}</span>
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(item.id);
                }} 
                className={`p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-50 transition flex-shrink-0 ${
                  isBookmarked ? 'text-sky-600' : ''
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-sky-600 text-sky-600' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
