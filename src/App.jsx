import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, Plus, Home, Compass, LayoutGrid, Heart, Sparkles, Sun, Moon } from 'lucide-react';
import { initialWebsites } from './data/websites';
import { db } from './lib/db';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedWebsites from './components/FeaturedWebsites';
import LatestAdditions from './components/LatestAdditions';
import CreateModal from './components/CreateModal';
import Toast from './components/Toast';
import AdminLayout from './admin/AdminLayout';
import AuthModal from './components/AuthModal';
import SubmitModal from './components/SubmitModal';
import SiteDetailModal from './components/SiteDetailModal';
import { auth, onAuthStateChanged } from './lib/firebase';

export default function App() {
  const [allWebsites, setAllWebsites] = useState(initialWebsites);
  const [favorites, setFavorites] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilterCategory, setFilterCategory] = useState('all');
  const [currentTab, setTab] = useState('popular');
  const [selectedSiteForModal, setSelectedSiteForModal] = useState(null);
  const [userUpvotes, setUserUpvotes] = useState(() => {
    try {
      const saved = localStorage.getItem('linkhub_user_upvotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // User Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('linkhub_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dark Mode Theme State
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('linkhub_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('linkhub_theme', next ? 'dark' : 'light');
    triggerToast(next ? "Tungi rejim yoqildi 🌙" : "Kunduzgi rejim yoqildi ☀️", next ? '🌙' : '☀️');
  };

  // Secret Admin Path Detection: only accessed via /maadmin103 or #/maadmin103
  const checkIsAdmin = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/maadmin103' || path === '/maadmin103/' || 
           hash === '#/maadmin103' || hash === '#maadmin103';
  };

  const [isAdminView, setIsAdminView] = useState(checkIsAdmin);

  const searchInputRef = useRef(null);

  // Initial Load from Database (Cloud or Local fallback)
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [sites, favs, subs] = await Promise.all([
          db.getWebsites(),
          db.getFavorites(user?.uid),
          db.getSubmissions()
        ]);
        if (sites) {
          setAllWebsites(sites);
        }
        if (favs) {
          setFavorites(favs);
        } else {
          setFavorites([]);
        }
        if (subs) {
          setSubmissions(subs);
        }
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Firebase Auth State Listener
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userData = {
          name: fbUser.displayName || 'Google User',
          email: fbUser.email,
          avatar: fbUser.photoURL || (fbUser.displayName || 'U').slice(0, 2).toUpperCase(),
          uid: fbUser.uid,
          role: 'Member'
        };
        setUser(userData);
        localStorage.setItem('linkhub_user', JSON.stringify(userData));
        try {
          const userFavs = await db.getFavorites(fbUser.uid);
          if (userFavs) setFavorites(userFavs);
        } catch (e) {
          console.error(e);
        }
      }
    });

    // Realtime Submissions Listener (Instantly syncs any user submission to admin console)
    const unsubscribeSubmissions = db.subscribeToSubmissions((subsList) => {
      if (subsList) {
        setSubmissions(subsList);
      }
    });

    // Listen for URL route changes (popstate & hashchange)
    const handleRoute = async () => {
      const isAdm = checkIsAdmin();
      setIsAdminView(isAdm);
      if (isAdm) {
        try {
          const freshSubs = await db.getSubmissions();
          if (freshSubs) setSubmissions(freshSubs);
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      unsubscribeAuth();
      if (unsubscribeSubmissions) unsubscribeSubmissions();
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Show Toast
  const triggerToast = (message, icon = '✓') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Toggle Bookmark
  const toggleBookmark = async (id) => {
    const isCurrentlyFav = favorites.includes(id);
    const willBeFav = !isCurrentlyFav;

    setFavorites((prev) => 
      willBeFav ? [...prev, id] : prev.filter((item) => item !== id)
    );

    triggerToast(
      willBeFav ? "Sayt sevimlilarga saqlandi!" : "Sayt sevimlilardan olib tashlandi",
      willBeFav ? '★' : 'ℹ'
    );

    await db.toggleFavorite(id, willBeFav, user?.uid);
  };

  // Community Submission: Submit new website
  const handleSubmitWebsite = async (submissionData) => {
    try {
      const newSub = await db.submitWebsite(submissionData);
      setSubmissions((prev) => [newSub, ...prev]);
      triggerToast("Sayt taklifi muvaffaqiyatli qabul qilindi!", '✓');
    } catch (err) {
      console.error(err);
      triggerToast("Arizani yuborishda xatolik", '✕');
    }
  };

  // Admin: Approve submission
  const handleApproveSubmission = async (submissionId, sitePayload) => {
    try {
      const approvedSite = await db.approveSubmission(submissionId, sitePayload);
      setAllWebsites((prev) => [approvedSite, ...prev]);
      setSubmissions((prev) => 
        prev.map(s => s.id === submissionId ? { ...s, status: 'approved' } : s)
      );
      triggerToast(`"${sitePayload.name}" sayti tasdiqlandi va katalogga qo'shildi!`, '✓');
    } catch (err) {
      console.error(err);
      triggerToast("Arizani tasdiqlashda xatolik", '✕');
    }
  };

  // Admin: Reject submission
  const handleRejectSubmission = async (submissionId) => {
    try {
      await db.rejectSubmission(submissionId);
      setSubmissions((prev) => 
        prev.map(s => s.id === submissionId ? { ...s, status: 'rejected' } : s)
      );
      triggerToast("Ariza rad etildi", 'ℹ');
    } catch (err) {
      console.error(err);
      triggerToast("Xatolik yuz berdi", '✕');
    }
  };

  // Admin: Delete submission
  const handleDeleteSubmission = async (submissionId) => {
    try {
      await db.deleteSubmission(submissionId);
      setSubmissions((prev) => prev.filter(s => s.id !== submissionId));
      triggerToast("Ariza o'chirildi", '✓');
    } catch (err) {
      console.error(err);
    }
  };

  // Add Custom Website / Collection (from visitor modal or admin)
  const handleAddWebsite = async (newSiteData) => {
    try {
      const created = await db.createWebsite(newSiteData);
      setAllWebsites((prev) => [created, ...prev]);
      triggerToast("Website added successfully to LinkHub!", '✓');
    } catch (err) {
      console.error(err);
      triggerToast("Error saving website", '✕');
    }
  };

  // Update Website (Admin)
  const handleUpdateWebsite = async (id, updatedData) => {
    try {
      await db.updateWebsite(id, updatedData);
      setAllWebsites((prev) => 
        prev.map(site => site.id === id ? { ...site, ...updatedData } : site)
      );
      triggerToast("Website updated successfully!", '✓');
    } catch (err) {
      console.error(err);
      triggerToast("Error updating website", '✕');
    }
  };

  // Delete Website (Admin)
  const handleDeleteWebsite = async (id) => {
    try {
      await db.deleteWebsite(id);
      setAllWebsites((prev) => prev.filter(site => site.id !== id));
      triggerToast("Website deleted from catalog", '✓');
    } catch (err) {
      console.error(err);
      triggerToast("Error deleting website", '✕');
    }
  };

  // Toggle Upvote / Like website (strictly limited to 1 like per user per site)
  const handleToggleUpvote = async (siteId) => {
    const isCurrentlyLiked = userUpvotes.includes(siteId);
    const nextUpvotes = isCurrentlyLiked
      ? userUpvotes.filter((id) => id !== siteId)
      : [...userUpvotes, siteId];

    setUserUpvotes(nextUpvotes);
    try {
      localStorage.setItem('linkhub_user_upvotes', JSON.stringify(nextUpvotes));
    } catch (e) {
      console.error(e);
    }

    let calculatedNewLikes = 0;
    setAllWebsites((prev) =>
      prev.map((site) => {
        if (site.id === siteId) {
          const current = Number(site.likesCount) || 0;
          calculatedNewLikes = isCurrentlyLiked ? Math.max(0, current - 1) : current + 1;
          return { ...site, likesCount: calculatedNewLikes };
        }
        return site;
      })
    );

    if (selectedSiteForModal && selectedSiteForModal.id === siteId) {
      setSelectedSiteForModal((prev) => {
        const current = Number(prev.likesCount) || 0;
        const next = isCurrentlyLiked ? Math.max(0, current - 1) : current + 1;
        return { ...prev, likesCount: next };
      });
    }

    triggerToast(
      isCurrentlyLiked ? "Ovoz qaytarib olindi" : "Ovozingiz qabul qilindi! ❤️",
      isCurrentlyLiked ? 'ℹ' : '❤️'
    );

    await db.toggleUpvoteWebsite(siteId, !isCurrentlyLiked, calculatedNewLikes);
  };

  // Admin: Seed curated websites
  const handleSeedCuratedWebsites = async () => {
    try {
      const seeded = await db.seedCuratedWebsites();
      setAllWebsites((prev) => {
        const map = new Map();
        prev.forEach(s => map.set(s.id, s));
        seeded.forEach(s => map.set(s.id, s));
        return Array.from(map.values());
      });
      triggerToast("20+ ta sara saytlar muvaffaqiyatli yuklandi!", '✨');
    } catch (e) {
      console.error(e);
      triggerToast("Saytlarni yuklashda xatolik yuz berdi", '✕');
    }
  };

  // Select Tag filter
  const handleSelectTag = (tag) => {
    setSearchQuery(tag);
    const sec = document.getElementById('featured-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterCategory('all');
    setTab('popular');
  };

  // Filtered Websites Computation
  const filteredWebsites = useMemo(() => {
    let list = allWebsites;

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((site) =>
        site.name.toLowerCase().includes(q) ||
        (site.description || '').toLowerCase().includes(q) ||
        (site.category || '').toLowerCase().includes(q) ||
        (site.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (currentFilterCategory !== 'all') {
      const cat = currentFilterCategory.toLowerCase();
      list = list.filter((site) =>
        (site.category || '').toLowerCase().includes(cat) ||
        (site.tags || []).some((t) => t.toLowerCase().includes(cat))
      );
    }

    // Tab filter
    if (currentTab === 'new') {
      list = list.filter((site) => site.new);
    } else if (currentTab === 'trending') {
      list = list.filter((site) => site.trending);
    } else if (currentTab === 'top_voted') {
      list = [...list].sort((a, b) => (Number(b.likesCount) || 0) - (Number(a.likesCount) || 0));
    } else if (currentTab === 'favorites_only') {
      list = list.filter((site) => favorites.includes(site.id));
    } else if (currentTab === 'collections') {
      list = list.filter((site) => site.popular || favorites.includes(site.id) || (site.tags || []).length > 0);
    }

    return list;
  }, [allWebsites, searchQuery, currentFilterCategory, currentTab, favorites]);

  // Global keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
      if (e.key === 'Escape') {
        setCreateModalOpen(false);
        setAuthModalOpen(false);
        setSubmitModalOpen(false);
        setSelectedSiteForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Admin: Refresh submissions manually
  const handleRefreshSubmissions = async () => {
    try {
      const freshSubs = await db.getSubmissions();
      setSubmissions(freshSubs);
      triggerToast("Arizalar ro'yxati yangilandi!", '✓');
    } catch (e) {
      console.error(e);
      triggerToast("Yangilashda xatolik yuz berdi", '✕');
    }
  };

  // If Secret Admin Route is accessed (/maadmin103), render Admin Console
  if (isAdminView) {
    return (
      <>
        <AdminLayout
          websites={allWebsites}
          submissions={submissions}
          onAddWebsite={handleAddWebsite}
          onUpdateWebsite={handleUpdateWebsite}
          onDeleteWebsite={handleDeleteWebsite}
          onSeedCuratedWebsites={handleSeedCuratedWebsites}
          onApproveSubmission={handleApproveSubmission}
          onRejectSubmission={handleRejectSubmission}
          onDeleteSubmission={handleDeleteSubmission}
          onRefreshSubmissions={handleRefreshSubmissions}
          onExitAdmin={() => {
            setIsAdminView(false);
            window.location.hash = '';
            if (window.location.pathname.includes('maadmin103')) {
              window.history.pushState(null, '', '/');
            }
          }}
        />
        <Toast toast={toast} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070b14] text-slate-800 dark:text-slate-100 flex antialiased selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Sidebar (Completely clean - no admin traces) */}
      <Sidebar
        currentTab={currentTab}
        setTab={setTab}
        currentFilterCategory={currentFilterCategory}
        setFilterCategory={setFilterCategory}
        favoritesCount={favorites.length}
        openCreateModal={() => setCreateModalOpen(true)}
        openSubmitModal={() => setSubmitModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        closeMobileSidebar={() => setMobileSidebarOpen(false)}
        user={user}
        openAuthModal={() => setAuthModalOpen(true)}
        toggleTheme={toggleTheme}
        triggerToast={triggerToast}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 lg:ml-72 min-w-0 flex flex-col">
        {/* Mobile Header (Clean, Glassy & Rich) */}
        <div className="md:hidden bg-slate-900/95 dark:bg-[#070b14]/95 backdrop-blur-md text-white px-4 py-2.5 flex items-center justify-between sticky top-0 z-30 border-b border-slate-800/80 shadow-sm">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setMobileSidebarOpen(true)} 
              className="p-1.5 -ml-1 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition active:scale-95"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div 
              onClick={() => {
                setTab('popular');
                setFilterCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-500 p-0.5 flex items-center justify-center shadow-sm">
                <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">LinkHub</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition active:scale-90"
              title={isDark ? "Kunduzgi rejim" : "Tungi rejim"}
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-sky-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Profile Avatar / Sign In */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="p-1 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 transition active:scale-95"
              title="Profil"
            >
              {user ? (
                <div className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center">
                  {user.avatar || user.name?.[0]?.toUpperCase() || 'U'}
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center">
                  👤
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Cosmic Hero Banner */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentFilterCategory={currentFilterCategory}
          setFilterCategory={setFilterCategory}
          searchInputRef={searchInputRef}
          isDark={isDark}
          toggleTheme={toggleTheme}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenSubmitModal={() => setSubmitModalOpen(true)}
          setTab={setTab}
        />

        {/* Content Body */}
        <div className="p-4 sm:p-8 lg:p-10 space-y-8 sm:space-y-10 max-w-7xl mx-auto w-full pb-28 md:pb-10">
          {/* Categories */}
          <Categories
            websites={allWebsites}
            currentFilterCategory={currentFilterCategory}
            setFilterCategory={setFilterCategory}
          />

          {/* Featured Websites */}
          <FeaturedWebsites
            websites={filteredWebsites}
            currentTab={currentTab}
            setTab={setTab}
            favorites={favorites}
            toggleBookmark={toggleBookmark}
            resetFilters={resetFilters}
            onOpenDetail={(site) => setSelectedSiteForModal(site)}
            userUpvotes={userUpvotes}
            onToggleUpvote={handleToggleUpvote}
            onSelectTag={handleSelectTag}
          />

          {/* Latest Additions (shows when sites exist) */}
          <LatestAdditions
            websites={allWebsites}
            favorites={favorites}
            toggleBookmark={toggleBookmark}
            setTab={setTab}
            onOpenDetail={(site) => setSelectedSiteForModal(site)}
          />
        </div>

        {/* Footer (Clean - no admin button) */}
        <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0a0f1d] py-6 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-3 transition-colors mb-16 md:mb-0">
          <p>© 2026 LinkHub. Barcha foydali saytlar bir joyda.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 font-medium text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Jonli sinxronizatsiya
            </span>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation Bar (App-like thumb-friendly bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. Home */}
          <button
            onClick={() => {
              setTab('popular');
              setFilterCategory('all');
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              currentTab === 'popular' && currentFilterCategory === 'all' && !searchQuery
                ? 'text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Asosiy</span>
          </button>

          {/* 2. Explore */}
          <button
            onClick={() => {
              setTab('explore');
              setFilterCategory('all');
              const sec = document.getElementById('featured-section');
              if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              currentTab === 'explore'
                ? 'text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Kashf</span>
          </button>

          {/* 3. Center Raised Submit Button */}
          <button
            onClick={() => setSubmitModalOpen(true)}
            className="flex flex-col items-center justify-center -mt-5 group cursor-pointer focus:outline-none"
            aria-label="Taklif yuborish"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 group-active:scale-95 transition-transform border-4 border-white dark:border-[#0a0f1d]">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 mt-0.5">Taklif</span>
          </button>

          {/* 4. Categories */}
          <button
            onClick={() => {
              const sec = document.getElementById('categories-section');
              if (sec) {
                sec.scrollIntoView({ behavior: 'smooth' });
              } else {
                setMobileSidebarOpen(true);
              }
            }}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-all cursor-pointer"
          >
            <LayoutGrid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Bo'limlar</span>
          </button>

          {/* 5. Favorites */}
          <button
            onClick={() => {
              setTab('favorites_only');
              setFilterCategory('all');
              const sec = document.getElementById('featured-section');
              if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative cursor-pointer ${
              currentTab === 'favorites_only'
                ? 'text-sky-600 dark:text-sky-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <div className="relative">
              <Heart className={`w-5 h-5 mb-0.5 ${currentTab === 'favorites_only' ? 'fill-sky-600 dark:fill-sky-400 text-sky-600 dark:text-sky-400' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {favorites.length > 99 ? '99+' : favorites.length}
                </span>
              )}
            </div>
            <span className="text-[10px]">Saqlangan</span>
          </button>
        </div>
      </nav>

      {/* Site Detail & Share Modal */}
      <SiteDetailModal
        site={selectedSiteForModal}
        isOpen={Boolean(selectedSiteForModal)}
        onClose={() => setSelectedSiteForModal(null)}
        isBookmarked={selectedSiteForModal ? favorites.includes(selectedSiteForModal.id) : false}
        isUpvoted={selectedSiteForModal ? userUpvotes.includes(selectedSiteForModal.id) : false}
        onToggleBookmark={toggleBookmark}
        onToggleUpvote={handleToggleUpvote}
        onSelectTag={handleSelectTag}
        triggerToast={triggerToast}
      />

      {/* Create Modal Dialog (Custom collection) */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAddWebsite={handleAddWebsite}
      />

      {/* Community Submit Tool Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmitWebsite={handleSubmitWebsite}
        user={user}
        triggerToast={triggerToast}
      />

      {/* User Auth / Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        setUser={setUser}
        triggerToast={triggerToast}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
