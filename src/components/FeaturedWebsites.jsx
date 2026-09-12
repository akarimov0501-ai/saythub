import React from 'react';
import { Bookmark, ExternalLink, ArrowRight, SearchX, Heart, Sparkles, Flame, Clock } from 'lucide-react';
import BrandIcon from './BrandIcon';

export default function FeaturedWebsites({ 
  websites, 
  currentTab, 
  setTab, 
  favorites, 
  toggleBookmark, 
  resetFilters,
  onOpenDetail,
  onUpvote,
  onSelectTag
}) {
  const userUpvotes = (() => {
    try {
      return JSON.parse(localStorage.getItem('linkhub_user_upvotes') || '[]');
    } catch {
      return [];
    }
  })();

  return (
    <section id="featured-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight">Featured Websites</h3>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold px-2.5 py-1 rounded-full border border-transparent dark:border-slate-700/60">
            {websites.length} {websites.length === 1 ? 'site' : 'sites'}
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full flex items-center gap-1 border border-slate-200/50 dark:border-slate-700/60 overflow-x-auto">
            <button 
              onClick={() => setTab('popular')} 
              className={`px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'popular' 
                  ? 'font-bold bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-sm' 
                  : 'font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Popular
            </button>
            <button 
              onClick={() => setTab('top_voted')} 
              className={`px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'top_voted' 
                  ? 'font-bold bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-sm' 
                  : 'font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Heart className="w-3 h-3 text-rose-500" />
              Top Voted
            </button>
            <button 
              onClick={() => setTab('trending')} 
              className={`px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'trending' 
                  ? 'font-bold bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-sm' 
                  : 'font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3 text-amber-500" />
              Trending
            </button>
            <button 
              onClick={() => setTab('new')} 
              className={`px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'new' 
                  ? 'font-bold bg-slate-900 text-white dark:bg-sky-600 dark:text-white shadow-sm' 
                  : 'font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3 h-3" />
              New
            </button>
          </div>

          <button 
            onClick={resetFilters} 
            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-xs sm:text-sm flex items-center gap-1 group ml-1 transition cursor-pointer"
          >
            All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      {websites.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">Saytlar topilmadi</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni tozalang.</p>
          <button 
            onClick={resetFilters} 
            className="px-4 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition shadow-md shadow-sky-600/20 active:scale-95 cursor-pointer"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {websites.map((site) => {
            const isBookmarked = favorites.includes(site.id);
            const isUpvoted = userUpvotes.includes(site.id);

            return (
              <div 
                key={site.id}
                onClick={() => onOpenDetail ? onOpenDetail(site) : window.open(site.url, '_blank')}
                className="site-card bg-white dark:bg-slate-900/80 rounded-2xl p-5 relative flex flex-col justify-between group cursor-pointer border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-sky-500/50 shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="flex items-center gap-3.5">
                      <BrandIcon type={site.iconType} name={site.name} logoUrl={site.logoUrl} />
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                          {site.name}
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-1 hover:text-sky-600 text-slate-400 transition"
                            title="To'g'ridan-to'g'ri saytga o'tish"
                          >
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </h3>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{site.category}</span>
                      </div>
                    </div>

                    {/* Card Top Actions: Bookmark & Upvote */}
                    <div className="flex items-center gap-1">
                      {/* Upvote Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onUpvote) onUpvote(site.id, site.likesCount || 0);
                        }}
                        title={isUpvoted ? "Ovoz berilgan" : "Like / Ovoz berish"}
                        className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
                          isUpvoted
                            ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-400'
                            : 'text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isUpvoted ? 'fill-rose-500 dark:fill-rose-400' : ''}`} />
                        <span className="text-[11px]">{site.likesCount || 0}</span>
                      </button>

                      {/* Bookmark Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(site.id);
                        }}
                        title={isBookmarked ? "Saqlangandan o'chirish" : "Saqlash"}
                        className={`p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
                          isBookmarked ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60' : ''
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-sky-600 text-sky-600 dark:fill-sky-400 dark:text-sky-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {site.description}
                  </p>
                </div>

                {/* Tag Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {site.tags.map((tag, i) => (
                      <button 
                        key={i} 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectTag) onSelectTag(tag);
                        }}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition cursor-pointer hover:border-sky-400 ${
                          site.tagColors?.[i] || 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Batafsil →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
