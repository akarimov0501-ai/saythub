import React from 'react';
import { Bookmark, ExternalLink, ArrowRight, SearchX } from 'lucide-react';
import BrandIcon from './BrandIcon';

export default function FeaturedWebsites({ 
  websites, 
  currentTab, 
  setTab, 
  favorites, 
  toggleBookmark,
  resetFilters
}) {
  return (
    <section id="featured-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-extrabold text-slate-900 text-xl">Featured Websites</h3>
          <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-2.5 py-1 rounded-full">
            {websites.length} sites
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-full flex items-center gap-1">
            <button 
              onClick={() => setTab('new')} 
              className={`px-3.5 py-1 rounded-full text-xs transition ${
                currentTab === 'new' 
                  ? 'font-bold bg-slate-900 text-white shadow-sm' 
                  : 'font-semibold text-slate-500 hover:text-slate-900'
              }`}
            >
              New
            </button>
            <button 
              onClick={() => setTab('popular')} 
              className={`px-4 py-1.5 rounded-full text-xs transition ${
                currentTab === 'popular' 
                  ? 'font-bold bg-slate-900 text-white shadow-sm' 
                  : 'font-semibold text-slate-500 hover:text-slate-900'
              }`}
            >
              Popular
            </button>
            <button 
              onClick={() => setTab('trending')} 
              className={`px-3.5 py-1 rounded-full text-xs transition ${
                currentTab === 'trending' 
                  ? 'font-bold bg-slate-900 text-white shadow-sm' 
                  : 'font-semibold text-slate-500 hover:text-slate-900'
              }`}
            >
              Trending
            </button>
          </div>
          <button 
            onClick={resetFilters} 
            className="text-sky-600 hover:text-sky-700 font-semibold text-xs sm:text-sm flex items-center gap-1 group ml-2"
          >
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      {websites.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">No websites found</h3>
          <p className="text-sm text-slate-500 mb-4">Try adjusting your search keywords or clear current filters.</p>
          <button 
            onClick={resetFilters} 
            className="px-4 py-2 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {websites.map((site) => {
            const isBookmarked = favorites.includes(site.id);
            return (
              <div 
                key={site.id}
                onClick={() => window.open(site.url, '_blank')}
                className="site-card bg-white rounded-2xl p-5 relative flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="flex items-center gap-3.5">
                      <BrandIcon type={site.iconType} name={site.name} />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                          {site.name}
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">{site.category}</span>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(site.id);
                      }}
                      title={isBookmarked ? "Remove bookmark" : "Save bookmark"}
                      className={`p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-slate-50 transition ${
                        isBookmarked ? 'text-sky-600 bg-sky-50' : ''
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-sky-600 text-sky-600' : ''}`} />
                    </button>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {site.description}
                  </p>
                </div>

                {/* Tag Badges */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {site.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                        site.tagColors?.[i] || 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
