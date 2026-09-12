import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Globe, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ShieldCheck,
  Download
} from 'lucide-react';
import AdminWebsites from './AdminWebsites';
import AdminCategories from './AdminCategories';
import AdminSubmissions from './AdminSubmissions';
import { Send } from 'lucide-react';

export default function AdminLayout({ 
  websites, 
  submissions = [],
  onAddWebsite, 
  onUpdateWebsite, 
  onDeleteWebsite, 
  onSeedCuratedWebsites,
  onApproveSubmission,
  onRejectSubmission,
  onDeleteSubmission,
  onRefreshSubmissions,
  onExitAdmin 
}) {
  const [activeTab, setActiveTab] = useState('websites');

  // Stats
  const totalCount = websites.length;
  const popularCount = websites.filter(w => w.popular).length;
  const trendingCount = websites.filter(w => w.trending).length;
  const newCount = websites.filter(w => w.new).length;

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(websites, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `linkhub_websites_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onExitAdmin}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to LinkHub</span>
            </button>
            <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">LinkHub</span>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={exportJSON}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-medium flex items-center gap-1.5"
              title="Export catalog as JSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Backup JSON</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                AK
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold leading-tight">akarimov0501@gmail.com</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Super Admin
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Total Websites</span>
              <h3 className="text-2xl font-black text-slate-900">{totalCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Popular Sites</span>
              <h3 className="text-2xl font-black text-slate-900">{popularCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">Trending</span>
              <h3 className="text-2xl font-black text-slate-900">{trendingCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400">New Additions</span>
              <h3 className="text-2xl font-black text-slate-900">{newCount}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button 
            onClick={() => setActiveTab('websites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'websites' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Globe className="w-4 h-4" />
            Websites Catalog ({totalCount})
          </button>

          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'categories' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            Categories
          </button>

          <button 
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'submissions' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Send className="w-4 h-4" />
            Submissions ({submissions.length})
            {submissions.filter(s => s.status === 'pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Active Tab View */}
        {activeTab === 'websites' && (
          <AdminWebsites 
            websites={websites}
            onAddWebsite={onAddWebsite}
            onUpdateWebsite={onUpdateWebsite}
            onDeleteWebsite={onDeleteWebsite}
            onSeedCuratedWebsites={onSeedCuratedWebsites}
          />
        )}

        {activeTab === 'categories' && (
          <AdminCategories websites={websites} />
        )}

        {activeTab === 'submissions' && (
          <AdminSubmissions 
            submissions={submissions}
            onApproveSubmission={onApproveSubmission}
            onRejectSubmission={onRejectSubmission}
            onDeleteSubmission={onDeleteSubmission}
            onRefreshSubmissions={onRefreshSubmissions}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-8 text-center text-xs text-slate-400">
        LinkHub Cloud Admin Console • Realtime Google Cloud Firestore Sync
      </footer>
    </div>
  );
}
