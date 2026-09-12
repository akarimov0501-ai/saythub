import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  PenTool, 
  Code2, 
  CheckSquare, 
  GraduationCap, 
  Wallet, 
  PlaySquare, 
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Layers
} from 'lucide-react';

const categoryIcons = {
  ai: Sparkles,
  design: PenTool,
  development: Code2,
  productivity: CheckSquare,
  education: GraduationCap,
  finance: Wallet,
  entertainment: PlaySquare,
  all: MoreHorizontal
};

const PRIMARY_CATEGORIES = [
  { id: 'ai', name: 'AI Tools', color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400', icon: Sparkles },
  { id: 'design', name: 'Design', color: 'bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400', icon: PenTool },
  { id: 'development', name: 'Development', color: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400', icon: Code2 },
];

const SECONDARY_CATEGORIES = [
  { id: 'productivity', name: 'Productivity', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', icon: CheckSquare },
  { id: 'education', name: 'Education', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', icon: GraduationCap },
  { id: 'finance', name: 'Finance', color: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400', icon: Wallet },
  { id: 'entertainment', name: 'Entertainment', color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400', icon: PlaySquare }
];

export default function Categories({ websites = [], currentFilterCategory = 'all', setFilterCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If a secondary category is currently selected, auto-expand the tray so it is visible
  const isSecondaryActive = SECONDARY_CATEGORIES.some(
    cat => cat.name.toLowerCase() === currentFilterCategory.toLowerCase()
  );

  useEffect(() => {
    if (isSecondaryActive) {
      setIsExpanded(true);
    }
  }, [currentFilterCategory, isSecondaryActive]);

  const getCategoryCount = (catName) => {
    if (!websites || !Array.isArray(websites) || websites.length === 0) {
      return '0 sites';
    }
    const count = websites.filter(w => {
      const wCat = (w.category || '').toLowerCase();
      const cName = catName.toLowerCase();
      if (cName === 'ai tools') {
        return wCat === 'ai tools' || wCat === 'ai';
      }
      return wCat === cName;
    }).length;
    return `${count} ${count === 1 ? 'site' : 'sites'}`;
  };

  const handleSelectCategory = (catName) => {
    const nextCategory = currentFilterCategory.toLowerCase() === catName.toLowerCase() ? 'all' : catName;
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
            Popular Categories
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
          View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      {/* Top 4 Cards Grid (3 primary categories + 1 More card) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        {PRIMARY_CATEGORIES.map((cat) => {
          const IconComponent = cat.icon || Sparkles;
          const isActive = currentFilterCategory.toLowerCase() === cat.name.toLowerCase();
          
          return (
            <div 
              key={cat.id}
              onClick={() => handleSelectCategory(cat.name)}
              className={`category-card cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 bg-white dark:bg-slate-800 border ${
                isActive 
                  ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/20 dark:bg-sky-950/20' 
                  : 'border-slate-100 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md'
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
          className={`category-card cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 bg-white dark:bg-slate-800 border ${
            isExpanded || isSecondaryActive
              ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/30 dark:bg-sky-950/30' 
              : 'border-slate-100 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-3 transition-transform group-hover:scale-105">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            ) : (
              <MoreHorizontal className="w-6 h-6" />
            )}
          </div>
          <div className="flex items-center gap-1 mb-0.5">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm whitespace-nowrap">
              More
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
              : (isSecondaryActive ? currentFilterCategory : `+${SECONDARY_CATEGORIES.length} categories`)}
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
              const IconComponent = cat.icon || CheckSquare;
              const isActive = currentFilterCategory.toLowerCase() === cat.name.toLowerCase();
              
              return (
                <div 
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`category-card cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-200 bg-white dark:bg-slate-800 border ${
                    isActive 
                      ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/20 dark:bg-sky-950/20' 
                      : 'border-slate-100 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow'
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
