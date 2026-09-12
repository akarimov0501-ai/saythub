import React from 'react';

export default function BrandIcon({ type, name, size = 'default' }) {
  const containerClass = size === 'small' 
    ? "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
    : "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm";

  switch (type) {
    case 'chatgpt':
      return (
        <div className={`${containerClass} bg-[#10a37f] text-white`}>
          <svg className={size === 'small' ? "w-5 h-5" : "w-7 h-7"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.07 17.07l-1.41-1.41A8 8 0 1 0 6.34 6.34L4.93 4.93A10 10 0 0 1 12 2z"/>
            <path d="M12 6a6 6 0 0 1 4.24 10.24l-1.41-1.41A4 4 0 1 0 8.46 8.46L7.05 7.05A6 6 0 0 1 12 6z"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
        </div>
      );
    case 'figma':
      return (
        <div className={`${containerClass} bg-black`}>
          <svg className={size === 'small' ? "w-4 h-6" : "w-6 h-8"} viewBox="0 0 38 57" fill="none">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
          </svg>
        </div>
      );
    case 'notion':
      return (
        <div className={`${containerClass} bg-white border border-slate-200 text-slate-900`}>
          <svg className={size === 'small' ? "w-5 h-5" : "w-7 h-7"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.373L18.423 2.34c-.467-.374-.933-.467-1.773-.42l-11.86.746c-.513.047-.653.233-.336.56l.005-.018zm.933 3.593v13.53c0 .746.373 1.026 1.213.98l14.288-.84c.84-.046.933-.56.933-1.12V6.82c0-.56-.28-.84-.746-.793l-14.894.886c-.56.047-.794.373-.794.888zm12.935.793c.093.42 0 .84-.42.887l-.7.14v8.865c-.466.28-.933.467-1.353.467-.653 0-.933-.28-1.54-.98l-4.432-6.95v6.95l1.493.327s0 .746-.84.746l-2.8-.186c-.093-.42 0-.84.42-.887l.793-.14V9.62l-1.073-.093s0-.747.84-.747l2.893.187 4.526 6.997V9.76l-1.166-.14s0-.747.84-.747l2.585.187z"/>
          </svg>
        </div>
      );
    case 'vscode':
      return (
        <div className={`${containerClass} bg-[#007ACC] text-white`}>
          <svg className={size === 'small' ? "w-5 h-5" : "w-7 h-7"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.583.063a1.5 1.5 0 0 0-1.054.407L7.38 8.875 3.32 5.766a1.05 1.05 0 0 0-1.396.115l-1.6 1.62a1.05 1.05 0 0 0 .048 1.487l4.032 3.652-4.032 3.652a1.05 1.05 0 0 0-.048 1.488l1.6 1.62a1.05 1.05 0 0 0 1.396.114l4.06-3.109 9.15 8.405a1.5 1.5 0 0 0 2.502-1.096V1.16A1.5 1.5 0 0 0 17.583.063zm.417 4.14v15.594L9.89 12.64 18 4.203z"/>
          </svg>
        </div>
      );
    case 'github':
      return (
        <div className={`${containerClass} bg-[#181717] text-white`}>
          <svg className={size === 'small' ? "w-5 h-5" : "w-7 h-7"} viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </div>
      );
    case 'canva':
      return (
        <div className={`${containerClass} bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white`}>
          <span className="font-serif italic text-2xl font-black">C</span>
        </div>
      );
    case 'googledrive':
      return (
        <div className={`${containerClass} bg-white border border-slate-200`}>
          <svg className={size === 'small' ? "w-5 h-5" : "w-7 h-7"} viewBox="0 0 24 24">
            <path fill="#FFC107" d="M8.5 2.5L2 14.5l3.5 6L12 8.5z"/>
            <path fill="#2196F3" d="M12 8.5h10.5L16 2.5H8.5z"/>
            <path fill="#4CAF50" d="M12 8.5l3.5 6H22l-3.5-6z"/>
            <path fill="#0066DA" d="M15.5 14.5L12 20.5h10l3.5-6z"/>
            <path fill="#00AC47" d="M5.5 20.5h10L12 14.5 2 14.5z"/>
          </svg>
        </div>
      );
    case 'youtube':
      return (
        <div className={`${containerClass} bg-[#ff0000] text-white`}>
          <svg className={size === 'small' ? "w-5 h-5" : "w-7 h-7"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
      );
    case 'coursera':
      return (
        <div className={`${containerClass} bg-[#0056D2] text-white font-bold text-2xl`}>
          C
        </div>
      );
    case 'unsplash':
      return (
        <div className={`${containerClass} bg-black text-white`}>
          <svg className={size === 'small' ? "w-4 h-4" : "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"/>
          </svg>
        </div>
      );
    case 'vercel':
      return (
        <div className={`${containerClass} bg-black text-white`}>
          <svg className={size === 'small' ? "w-4 h-4" : "w-6 h-6"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L24 22H0L12 1Z"/>
          </svg>
        </div>
      );
    case 'stripe':
      return (
        <div className={`${containerClass} bg-[#635BFF] text-white font-black text-2xl`}>
          S
        </div>
      );
    case 'linear':
      return (
        <div className={`${containerClass} bg-[#5E6AD2] text-white`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m3 16 14-14m-8 19L21 9"/></svg>
        </div>
      );
    case 'midjourney':
      return (
        <div className={`${containerClass} bg-slate-900 border border-slate-700 text-white`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18h20M5 18l7-14 7 14M12 4v14"/></svg>
        </div>
      );
    case 'dribbble':
      return (
        <div className={`${containerClass} bg-[#EA4C89] text-white`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.72 9.18a8.03 8.03 0 0 0-4.47-4.48A8.026 8.026 0 0 1 19.72 11.18zm-5.75-5.11a14.86 14.86 0 0 1 3.96 4.13A17.15 17.15 0 0 0 12 9.5c-.32 0-.64.01-.96.04a14.28 14.28 0 0 1 2.93-3.47zM10.2 10.88c.41-.03.82-.05 1.24-.05 1.93 0 3.73.44 5.34 1.23a17.84 17.84 0 0 1-2.95 6.07 14.2 14.2 0 0 1-3.63-7.25zm-2.02.5c.01.21.02.42.04.63a12.78 12.78 0 0 0 4.19 6.84A8.01 8.01 0 0 1 4.28 12c0-.21.01-.42.03-.62.99.2 2.6.28 3.87.0zM4.69 9.87c.72-.03 1.96-.13 3.32-.48a12.83 12.83 0 0 0-2.3-3.47A7.98 7.98 0 0 0 4.69 9.87zm2.46-4.52a14.33 14.33 0 0 1 2.37 3.42c1.78-.49 3.48-.68 5.09-.59A7.98 7.98 0 0 0 7.15 5.35z"/>
          </svg>
        </div>
      );
    case 'supabase':
      return (
        <div className={`${containerClass} bg-black border border-emerald-900/50 text-[#3ECF8E]`}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.302 14.28a.396.396 0 0 0 .316.634H10.5v8.69a.396.396 0 0 0 .716.233l10.982-14.117a.396.396 0 0 0-.836-.366z"/></svg>
        </div>
      );
    case 'duolingo':
      return (
        <div className={`${containerClass} bg-[#58CC02] text-white`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="10" r="3" fill="#fff"/><circle cx="9" cy="10" r="1.5" fill="#2B3945"/>
            <circle cx="15" cy="10" r="3" fill="#fff"/><circle cx="15" cy="10" r="1.5" fill="#2B3945"/>
            <path d="M12 12.5l-1.5 2h3z" fill="#FFC800"/>
          </svg>
        </div>
      );
    case 'netflix':
      return (
        <div className={`${containerClass} bg-black text-[#E50914] font-black text-xl`}>
          N
        </div>
      );
    default:
      return (
        <div className={`${containerClass} bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-lg`}>
          {(name || 'W').substring(0, 2).toUpperCase()}
        </div>
      );
  }
}
