import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700 animate-toast text-sm font-medium">
      <span className="w-5 h-5 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
        {toast.icon || '✓'}
      </span>
      {toast.message}
    </div>
  );
}
