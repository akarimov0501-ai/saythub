import React, { useState, useEffect } from 'react';
import { 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Layers
} from 'lucide-react';
import { PRIMARY_CATEGORIES, SECONDARY_CATEGORIES, matchesCategory } from '../data/categories';

export default function Categories({ websites = [], currentFilterCategory = 'all', setFilterCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If a secondary category is currently selected, auto-expand the tray so it is visible
  const isSecondaryActive = SECONDARY_CATEGORIES.some(
    cat => matchesCategory({ category: currentFilterCategory }, cat.name)
  );

  useEffect(() => {
    if (isSecondaryActive) {
      setIsExpanded(true);
    }
  }, [currentFilterCategory, isSecondaryActive]);

  const getCategoryCount = (catName) => {
    if (!websites || !Array.isArray(websites) || websites.length === 0) {
      return '0 ta sayt';
    }
    const count = websites.filter(w => matchesCategory(w, catName)).length;
    return `${count} ta sayt`;
  };

  const handleSelectCategory = (catName) => {
    const isCurrentlyActive = matchesCategory({ category: currentFilterCategory }, catName);
    const nextCategory = isCurrentlyActive ? 'all' : catName;
    setFilterCategory(nextCategory);
    const sec = document.getElementById('featured-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleMore = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <section id="categories-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight">
            Ommabop kategoriyalar
          </h3>
          {currentFilterCategory !== 'all' && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 text-xs font-semibold border border-sky-200 dark:border-sky-800">
              {currentFilterCategory}
              <button 
                onClick={() => setFilterCategory('all')} 
                className="ml-1 hover:text-rose-500 font-bold"
                title="Filtrni tozalash"
              >
                ×
              </button>
            </span>
          )}
        </div>

        <button 
          onClick={() => {
            setFilterCategory('all');
            const sec = document.getElementById('featured-section');
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          }} 
          className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-xs sm:text-sm flex items-center gap-1 group cursor-pointer transition"
        >
          Barchasi <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      {/* Top 4 Cards Grid (3 primary categories + 1 More card) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        {PRIMARY_CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = matchesCategory({ category: currentFilterCategory }, cat.name);
          
          return (
            <div 
              key={cat.id}
              onClick={() => handleSelectCategory(cat.name)}
              className={`category-card cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 bg-white dark:bg-[#0d1424] border ${
                isActive 
                  ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/20 dark:bg-sky-950/40' 
                  : 'border-slate-100 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-105`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm whitespace-nowrap mb-0.5">
                {cat.name}
              </h4>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {getCategoryCount(cat.name)}
              </span>
            </div>
          );
        })}

        {/* 4th Card: More / Boshqalar (Toggle) */}
        <div 
          onClick={handleToggleMore}
          className={`category-card cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 bg-white dark:bg-[#0d1424] border ${
            isExpanded || isSecondaryActive
              ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/30 dark:bg-sky-950/40' 
              : 'border-slate-100 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-3 transition-transform group-hover:scale-105">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            ) : (
              <MoreHorizontal className="w-6 h-6" />
            )}
          </div>
          <div className="flex items-center gap-1 mb-0.5">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm whitespace-nowrap">
              Boshqalar
            </h4>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {isExpanded 
              ? 'Yashirish' 
              : (isSecondaryActive ? currentFilterCategory : `+${SECONDARY_CATEGORIES.length} toifalar`)}
          </span>
        </div>
      </div>

      {/* Expanded Secondary Categories Tray */}
      {isExpanded && (
        <div className="pt-3 pb-1 border-t border-dashed border-slate-200 dark:border-slate-700/80 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              Qo'shimcha toifalar
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition font-medium"
            >
              Yopish ✕
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
            {SECONDARY_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = matchesCategory({ category: currentFilterCategory }, cat.name);
              
              return (
                <div 
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`category-card cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 bg-white dark:bg-[#0d1424] border ${
                    isActive 
                      ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/20 dark:bg-sky-950/40' 
                      : 'border-slate-100 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-105`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm whitespace-nowrap mb-0.5">
                    {cat.name}
                  </h4>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {getCategoryCount(cat.name)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
