import React, { useState } from 'react';
import { categoriesList as defaultCategories } from '../data/websites';
import { LayoutGrid, Sparkles, Plus, X, Trash2, Check } from 'lucide-react';

const COLOR_PRESETS = [
  { label: 'Sky Blue', value: 'bg-sky-50 text-sky-600 border-sky-200' },
  { label: 'Purple', value: 'bg-purple-50 text-purple-600 border-purple-200' },
  { label: 'Emerald', value: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { label: 'Amber', value: 'bg-amber-50 text-amber-600 border-amber-200' },
  { label: 'Rose Pink', value: 'bg-rose-50 text-rose-600 border-rose-200' },
  { label: 'Indigo', value: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
];

export default function AdminCategories({ websites }) {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('linkhub_custom_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0].value);

  // Count how many websites in each category
  const getCategoryCount = (catName) => {
    return websites.filter(w => (w.category || '').toLowerCase() === catName.toLowerCase()).length;
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCategory = {
      id: newCatName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: newCatName.trim(),
      color: selectedColor,
      count: '0 sites'
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    localStorage.setItem('linkhub_custom_categories', JSON.stringify(updated));
    setNewCatName('');
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (catId) => {
    if (confirm("Ushbu kategoriyani ro'yxatdan o'chirmoqchimisiz?")) {
      const updated = categories.filter(c => c.id !== catId);
      setCategories(updated);
      localStorage.setItem('linkhub_custom_categories', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Active Categories</h3>
          <p className="text-xs text-slate-400">Total {categories.length} categories available for catalog classification</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const liveCount = getCategoryCount(cat.name);
          const isDefault = defaultCategories.some(d => d.id === cat.id);

          return (
            <div key={cat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center font-bold`}>
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{cat.name}</h4>
                  <span className="text-xs text-slate-400">{liveCount} live sites</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Active
                </span>
                {!isDefault && (
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Kategoriyani o'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Add New Category</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category Name</label>
                <input 
                  type="text" 
                  required 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Crypto, Marketing, 3D"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Color Accent</label>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(preset.value)}
                      className={`p-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 ${preset.value} ${
                        selectedColor === preset.value ? 'ring-2 ring-slate-900 shadow-sm' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {preset.label.split(' ')[0]}
                      {selectedColor === preset.value && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
