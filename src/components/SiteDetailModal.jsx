import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  Heart, 
  Copy, 
  Check, 
  Share2, 
  Send, 
  Sparkles, 
  ShieldCheck,
  Tag,
  Globe
} from 'lucide-react';
import BrandIcon from './BrandIcon';

export default function SiteDetailModal({
  site,
  isOpen,
  onClose,
  isBookmarked,
  isUpvoted,
  onToggleBookmark,
  onToggleUpvote,
  onSelectTag,
  triggerToast
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !site) return null;

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(site.url);
    setCopied(true);
    if (triggerToast) triggerToast("Havola nusxalandi!", '✓');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpvoteClick = (e) => {
    e.stopPropagation();
    if (onToggleUpvote) onToggleUpvote(site.id);
  };

  const shareToTelegram = () => {
    const text = `${site.name} — ${site.description}\nKo'rish: ${site.url}\n(LinkHub orqali topildi)`;
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(site.url)}&text=${encodeURIComponent(text)}`;
    window.open(tgUrl, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Check out ${site.name}: ${site.description}`;
    const twUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(site.url)}&text=${encodeURIComponent(text)}`;
    window.open(twUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: site.name,
          text: site.description,
          url: site.url
        });
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      handleCopyUrl();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
      >
        {/* Modal Top Header Banner */}
        <div className="relative bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-pink-500/10 dark:from-sky-950/40 dark:via-indigo-950/40 dark:to-pink-950/40 p-6 pb-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-md border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center flex-shrink-0">
              <BrandIcon type={site.iconType} name={site.name} logoUrl={site.logoUrl} className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {site.name}
                </h2>
                <span className="text-sky-500 dark:text-sky-400" title="Tasdiqlangan vosita">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {site.category}
                </span>
                {site.trending && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    🔥 Trending
                  </span>
                )}
                {site.new && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    ✨ Yangi
                  </span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center transition border border-slate-200 dark:border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Sayt haqida
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {site.description || "Ushbu sayt bo'yicha qo'shimcha tafsilotlar kiritilmagan."}
            </p>
          </div>

          {/* Tags */}
          {site.tags && site.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Kalit so'zlar va teglar
              </h4>
              <div className="flex flex-wrap gap-2">
                {site.tags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (onSelectTag) onSelectTag(tag);
                      onClose();
                    }}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/50 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Official URL Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 truncate min-w-0">
              <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                {site.url}
              </span>
            </div>
            <button
              onClick={handleCopyUrl}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition flex items-center gap-1 flex-shrink-0"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Nusxalandi' : 'Nusxa'}
            </button>
          </div>

          {/* Share Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" /> Do'stlarga ulashish
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={shareToTelegram}
                className="py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-sky-200/60 dark:border-sky-800/60 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Telegram
              </button>

              <button
                onClick={shareToTwitter}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <span>𝕏</span> Twitter
              </button>

              <button
                onClick={handleNativeShare}
                className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Ulashish
              </button>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(site.id)}
              className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isBookmarked 
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-700' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
              title={isBookmarked ? "Saqlangandan o'chirish" : "Saqlanganlarga qo'shish"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-sky-600 dark:fill-sky-400 text-sky-600 dark:text-sky-400' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saqlangan' : 'Saqlash'}</span>
            </button>

            {/* Upvote button (Toggle: strictly 1 like per user) */}
            <button
              onClick={handleUpvoteClick}
              className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 ${
                isUpvoted
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
              title={isUpvoted ? "Ovozni qaytarib olish" : "Ovoz berish / Like"}
            >
              <Heart className={`w-4 h-4 transition-transform duration-200 ${isUpvoted ? 'fill-rose-600 dark:fill-rose-400 text-rose-600 dark:text-rose-400 scale-110' : ''}`} />
              <span>{site.likesCount || 0}</span>
              <span className="hidden sm:inline text-[11px] font-normal text-slate-400 ml-0.5">
                {isUpvoted ? '(Ovoz berilgan)' : ''}
              </span>
            </button>
          </div>

          {/* Primary Visit Website Button */}
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-sky-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer"
          >
            <span>Saytga o'tish</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
