import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';
import BrandIcon from '../components/BrandIcon';

export default function AdminWebsites({ 
  websites, 
  onAddWebsite, 
  onUpdateWebsite, 
  onDeleteWebsite 
}) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'AI',
    description: '',
    tags: 'AI, Productivity',
    popular: false,
    trending: false,
    isNew: true,
    iconType: 'custom'
  });

  const openAddModal = () => {
    setEditingSite(null);
    setFormData({
      name: '',
      url: '',
      category: 'AI',
      description: '',
      tags: 'AI, Productivity',
      popular: false,
      trending: false,
      isNew: true,
      iconType: 'custom'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (site) => {
    setEditingSite(site);
    setFormData({
      name: site.name,
      url: site.url,
      category: site.category,
      description: site.description || '',
      tags: (site.tags || []).join(', '),
      popular: Boolean(site.popular),
      trending: Boolean(site.trending),
      isNew: Boolean(site.new),
      iconType: site.iconType || 'custom'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;

    const parsedTags = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const sitePayload = {
      name: formData.name,
      url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
      category: formData.category,
      description: formData.description,
      tags: parsedTags.length > 0 ? parsedTags : [formData.category],
      tagColors: ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
      popular: formData.popular,
      trending: formData.trending,
      new: formData.isNew,
      iconType: formData.iconType
    };

    if (editingSite) {
      await onUpdateWebsite(editingSite.id, sitePayload);
    } else {
      await onAddWebsite(sitePayload);
    }

    setIsModalOpen(false);
  };

  const filtered = websites.filter(site => {
    const matchSearch = site.name.toLowerCase().includes(search.toLowerCase()) ||
                        (site.description || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || site.category.toLowerCase() === filterCat.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar: Search, Filter & Add Button */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search websites..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <select 
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 bg-white"
          >
            <option value="all">All Categories</option>
            <option value="AI">AI Tools</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Productivity">Productivity</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <button 
          onClick={openAddModal}
          className="w-full sm:w-auto px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          Add Website
        </button>
      </div>

      {/* Websites Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Website</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Badges</th>
                <th className="px-5 py-3.5">Tags</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 flex items-center gap-3">
                    <BrandIcon type={site.iconType} name={site.name} size="small" />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        {site.name}
                        <a href={site.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-600">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{site.description}</p>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">
                      {site.category}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {site.popular && (
                        <span title="Popular" className="p-1 rounded bg-purple-50 text-purple-600">
                          <Sparkles className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {site.trending && (
                        <span title="Trending" className="p-1 rounded bg-amber-50 text-amber-600">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {site.new && (
                        <span title="New" className="p-1 rounded bg-emerald-50 text-emerald-600">
                          <Clock className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(site.tags || []).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => openEditModal(site)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-100 transition"
                        title="Edit Website"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`"${site.name}" saytini o'chirishni xohlaysizmi?`)) {
                            onDeleteWebsite(site.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete Website"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-toast">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">
                {editingSite ? 'Edit Website' : 'Add New Website to LinkHub'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Claude AI"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 bg-white"
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
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Website URL</label>
                <input 
                  type="text" 
                  required 
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://claude.ai"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea 
                  rows={2} 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of the platform..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="AI, Assistant, LLM"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand Icon Type</label>
                  <select 
                    value={formData.iconType}
                    onChange={(e) => setFormData({ ...formData, iconType: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="custom">Auto (Letters/Gradient)</option>
                    <option value="chatgpt">ChatGPT</option>
                    <option value="figma">Figma</option>
                    <option value="notion">Notion</option>
                    <option value="vscode">VS Code</option>
                    <option value="github">GitHub</option>
                    <option value="canva">Canva</option>
                    <option value="googledrive">Google Drive</option>
                    <option value="youtube">YouTube</option>
                    <option value="coursera">Coursera</option>
                    <option value="unsplash">Unsplash</option>
                    <option value="vercel">Vercel</option>
                    <option value="stripe">Stripe</option>
                    <option value="linear">Linear</option>
                    <option value="midjourney">Midjourney</option>
                    <option value="dribbble">Dribbble</option>
                    <option value="supabase">Supabase</option>
                    <option value="duolingo">Duolingo</option>
                    <option value="netflix">Netflix</option>
                  </select>
                </div>
              </div>

              {/* Status Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded"
                  />
                  Popular
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={formData.trending}
                    onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded"
                  />
                  Trending
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded"
                  />
                  New
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  {editingSite ? 'Save Changes' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
