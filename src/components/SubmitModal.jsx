import React, { useState, useEffect } from 'react';
import { X, Send, Wand2, Sparkles, CheckCircle2, Globe, Tag, FileText, User } from 'lucide-react';

export default function SubmitModal({ 
  isOpen, 
  onClose, 
  onSubmitWebsite, 
  user,
  triggerToast 
}) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [category, setCategory] = useState('AI');
  const [description, setDescription] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setSubmitterName(user.name || '');
      setSubmitterEmail(user.email || '');
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // Auto-generate high-res favicon from URL
  const autoFetchFavicon = () => {
    if (!url) return;
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const domain = new URL(fullUrl).hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      setLogoUrl(faviconUrl);
      if (triggerToast) triggerToast("Logotip havolasi avtomatik yaratildi!", '✓');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    setIsSubmitting(true);

    const submissionPayload = {
      name: name.trim(),
      url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
      logoUrl: logoUrl.trim(),
      category,
      description: description.trim() || "Foydalanuvchi tomonidan tavsiya etilgan ajoyib sayt.",
      submitterName: submitterName.trim() || (user ? user.name : 'Mehmon'),
      submitterEmail: submitterEmail.trim() || (user ? user.email : ''),
      submitterAvatar: user?.avatar || ''
    };

    try {
      await onSubmitWebsite(submissionPayload);
      setIsSubmitted(true);
      if (triggerToast) triggerToast("Arizangiz muvaffaqiyatli yuborildi!", '✓');
    } catch (err) {
      console.error("Submission error:", err);
      if (triggerToast) triggerToast("Arizani yuborishda xatolik yuz berdi", '✕');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setUrl('');
    setLogoUrl('');
    setDescription('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto animate-toast text-slate-800 dark:text-slate-100">
        <button 
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          // Success View
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">Taklifingiz qabul qilindi!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                "{name}" sayti moderatorlarimizga yuborildi. Tekshiruvdan so'ng LinkHub bosh sahifasida barchaga ko'rinadi.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
              >
                Tushunarli, rahmat!
              </button>
            </div>
          </div>
        ) : (
          // Form View
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">Yangi sayt taklif qilish</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Foydali vositani butun hamjamiyat bilan ulashing</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Sayt nomi *</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Cursor AI" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Kategoriya *</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:border-sky-500"
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
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Sayt havolasi (URL) *</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      required 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://cursor.com" 
                      className="w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={autoFetchFavicon}
                    className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                    title="URL dan avtomatik logo olish"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span className="hidden sm:inline">Auto Logo</span>
                  </button>
                </div>
              </div>

              {/* Logo URL & Preview */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Logotip (URL manzili)</label>
                <div className="flex items-center gap-2.5">
                  <input 
                    type="url" 
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.png" 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:border-sky-500"
                  />
                  {logoUrl && (
                    <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 p-1 bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img 
                        src={logoUrl} 
                        alt="Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Qisqa tavsif (Nima uchun foydali?)</label>
                <textarea 
                    rows={2} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Sayt nima qiladi va kimlarga kerak..." 
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Submitter Info */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Taklif qiluvchi</label>
                  {user && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Google bilan kirilgan
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <input 
                    type="text" 
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="Ismingiz" 
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:border-sky-500"
                  />
                  <input 
                    type="email" 
                    value={submitterEmail}
                    onChange={(e) => setSubmitterEmail(e.target.value)}
                    placeholder="Emailingiz (ixtiyoriy)" 
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button" 
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Yuborilmoqda...' : 'Taklifni yuborish'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
