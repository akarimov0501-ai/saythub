import React from 'react';
import { 
  Sparkles, 
  PenTool, 
  Code2, 
  CheckSquare, 
  GraduationCap, 
  Wallet, 
  PlaySquare, 
  MoreHorizontal,
  ArrowRight 
} from 'lucide-react';
import { categoriesList } from '../data/websites';

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

export default function Categories({ currentFilterCategory, setFilterCategory }) {
  const handleSelectCategory = (catName) => {
    const nextCategory = catName === 'More' ? 'all' : (currentFilterCategory === catName ? 'all' : catName);
    setFilterCategory(nextCategory);
    const sec = document.getElementById('featured-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories-section">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-extrabold text-slate-900 text-xl">Popular Categories</h3>
        <button 
          onClick={() => {
            setFilterCategory('all');
            const sec = document.getElementById('featured-section');
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          }} 
          className="text-sky-600 hover:text-sky-700 font-semibold text-xs sm:text-sm flex items-center gap-1 group cursor-pointer"
        >
          View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      {/* Categories 8-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
        {categoriesList.map((cat) => {
          const IconComponent = categoryIcons[cat.id] || Sparkles;
          const isActive = currentFilterCategory !== 'all' && currentFilterCategory.toLowerCase() === cat.name.toLowerCase();
          
          return (
            <div 
              key={cat.id}
              onClick={() => handleSelectCategory(cat.name)}
              className={`category-card cursor-pointer rounded-2xl p-4 flex flex-col items-center text-center transition-all bg-white border ${
                isActive 
                  ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-md' 
                  : 'border-slate-100 hover:border-slate-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-3`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm whitespace-nowrap mb-0.5">{cat.name}</h4>
              <span className="text-xs text-slate-400 font-medium">{cat.count}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
