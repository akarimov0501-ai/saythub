import React, { useState } from 'react';
import { X, Sparkles, LogIn, LogOut, Check, Mail, Lock } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/firebase';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  user, 
  setUser, 
  triggerToast 
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Real Firebase Google Sign-In with popup
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const userData = {
        name: fbUser.displayName || 'Google User',
        email: fbUser.email,
        avatar: fbUser.photoURL || (fbUser.displayName || 'U').slice(0, 2).toUpperCase(),
        uid: fbUser.uid,
        role: 'Member'
      };
      setUser(userData);
      localStorage.setItem('linkhub_user', JSON.stringify(userData));
      triggerToast(`Xush kelibsiz, ${userData.name}!`, '✓');
      onClose();
    } catch (err) {
      console.warn("Google Sign-In popup error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        // User closed popup
      } else {
        triggerToast("Google orqali kirishda xatolik: Demo hisob bilan kirilmoqda", 'ℹ');
        // Graceful fallback for environments with blocked popups
        handleDemoSignIn({
          name: 'Azizbek Karimov',
          email: 'akarimov0501@gmail.com',
          avatar: 'AK',
          role: 'Creator'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = (demoUser) => {
    setLoading(true);
    setTimeout(() => {
      setUser(demoUser);
      localStorage.setItem('linkhub_user', JSON.stringify(demoUser));
      setLoading(false);
      triggerToast(`Xush kelibsiz, ${demoUser.name}!`, '✓');
      onClose();
    }, 300);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const username = email.split('@')[0];
    const newUser = {
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: email.trim(),
      avatar: username.slice(0, 2).toUpperCase(),
      role: 'Member'
    };

    handleDemoSignIn(newUser);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase sign out error:", e);
    }
    setUser(null);
    localStorage.removeItem('linkhub_user');
    triggerToast('Hisobdan muvaffaqiyatli chiqildi', '✓');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative animate-toast">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="text-center space-y-4 pt-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg shadow-sky-500/20">
              {user.avatar || 'MA'}
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-400">{user.email || 'Azo'}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between">
              <span className="font-semibold">Hisob holati:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Faol
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                Chiqish (Logout)
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg leading-tight">LinkHub'ga kirish</h3>
                <p className="text-[11px] text-slate-400">Sevimlilar va to'plamlaringizni saqlang</p>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google orqali kirish
            </button>

            <div className="relative flex items-center justify-center py-1">
              <span className="border-t border-slate-200 w-full"></span>
              <span className="bg-white px-2 text-[11px] font-semibold text-slate-400 absolute">yoki email bilan</span>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email manzili</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ismingiz@gmail.com" 
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Parol</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <LogIn className="w-4 h-4" />
                Kirish / Ro'yxatdan o'tish
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
