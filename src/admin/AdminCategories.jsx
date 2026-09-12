import React from 'react';
import { categoriesList } from '../data/websites';
import { LayoutGrid, Sparkles, Plus } from 'lucide-react';

export default function AdminCategories({ websites }) {
  // Count how many websites in each category
  const getCategoryCount = (catName) => {
    return websites.filter(w => w.category.toLowerCase() === catName.toLowerCase()).length;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Active Categories</h3>
          <p className="text-xs text-slate-400">Total {categoriesList.length} categories available for catalog classification</p>
        </div>
        <button 
          onClick={() => alert("Kategoriyalar tizimini kengaytirish tez kunda...")}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoriesList.map((cat) => {
          const liveCount = getCategoryCount(cat.name);
          return (
            <div key={cat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center font-bold`}>
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{cat.name}</h4>
                  <span className="text-xs text-slate-400">{liveCount} live sites</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Active
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
