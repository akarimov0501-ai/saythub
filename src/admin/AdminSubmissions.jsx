import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ExternalLink, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  User, 
  Globe, 
  Calendar 
} from 'lucide-react';
import BrandIcon from '../components/BrandIcon';

export default function AdminSubmissions({ 
  submissions = [], 
  onApproveSubmission, 
  onRejectSubmission, 
  onDeleteSubmission 
}) {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [search, setSearch] = useState('');

  const filtered = submissions.filter(sub => {
    const matchStatus = filterStatus === 'all' || sub.status === filterStatus;
    const matchSearch = (sub.name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (sub.description || '').toLowerCase().includes(search.toLowerCase()) ||
                        (sub.submitterName || '').toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-lg">Community Submissions</h3>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold animate-pulse">
                {pendingCount} yangi
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">Foydalanuvchilar tomonidan taklif qilingan saytlarni tekshirish va tasdiqlash</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Tabs */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                filterStatus === 'pending'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Kutilayotgan ({submissions.filter(s => s.status === 'pending').length})
            </button>

            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                filterStatus === 'approved'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Tasdiqlangan
            </button>

            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterStatus === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Barchasi ({submissions.length})
            </button>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <Clock className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
          <p className="text-sm font-semibold text-slate-600">Bu bo'limda hech qanday arizalar topilmadi</p>
          <p className="text-xs text-slate-400 mt-1">Foydalanuvchilar sayt taklif qilganida bu yerda paydo bo'ladi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((sub) => {
            const isPending = sub.status === 'pending';
            const isApproved = sub.status === 'approved';
            const isRejected = sub.status === 'rejected';

            return (
              <div 
                key={sub.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4 flex-1">
                  <BrandIcon type="custom" name={sub.name} logoUrl={sub.logoUrl} size="small" />
                  
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-base">{sub.name}</h4>
                      <a 
                        href={sub.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sky-600 hover:text-sky-700 text-xs font-semibold flex items-center gap-1 hover:underline"
                      >
                        {sub.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {sub.category}
                      </span>
                      {isPending && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                          Kutilmoqda
                        </span>
                      )}
                      {isApproved && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          Tasdiqlangan
                        </span>
                      )}
                      {isRejected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                          Rad etilgan
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                      {sub.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        {sub.submitterName || 'Mehmon'} {sub.submitterEmail ? `(${sub.submitterEmail})` : ''}
                      </span>
                      {sub.createdAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                  {isPending && (
                    <>
                      <button
                        onClick={() => onApproveSubmission(sub.id, sub)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Tasdiqlash (Publish)
                      </button>

                      <button
                        onClick={() => onRejectSubmission(sub.id)}
                        className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
                      >
                        <X className="w-3.5 h-3.5" />
                        Rad etish
                      </button>
                    </>
                  )}

                  {!isPending && (
                    <button
                      onClick={() => onDeleteSubmission(sub.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
