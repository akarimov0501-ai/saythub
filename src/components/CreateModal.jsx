import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function CreateModal({ isOpen, onClose, onAddWebsite }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('AI');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    onAddWebsite({
      name: name.trim(),
      url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
      category,
      description: description.trim() || 'User curated website.',
    });

    setName('');
    setUrl('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-toast">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Create New Collection</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Website Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Perplexity AI" 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Website URL</label>
            <input 
              type="url" 
              required 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://perplexity.ai" 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-white"
            >
              <option value="AI">AI Tools</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Productivity">Productivity</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Description</label>
            <textarea 
              rows={2} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the website..." 
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition"
            >
              Save to Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
