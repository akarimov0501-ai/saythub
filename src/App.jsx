import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, Plus } from 'lucide-react';
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
import { auth, onAuthStateChanged } from './lib/firebase';

export default function App() {
  const [allWebsites, setAllWebsites] = useState(initialWebsites);
  const [favorites, setFavorites] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilterCategory, setFilterCategory] = useState('all');
  const [currentTab, setTab] = useState('popular');
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
          db.getFavorites(),
          db.getSubmissions()
        ]);
        if (sites) {
          setAllWebsites(sites);
        }
        if (favs) {
          setFavorites(favs);
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
    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
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
      willBeFav ? "Site saved to bookmarks!" : "Site removed from bookmarks",
      willBeFav ? '★' : '✕'
    );

    await db.toggleFavorite(id, willBeFav);
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
        {/* Mobile Header (Clean - no admin button) */}
        <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileSidebarOpen(true)} 
              className="p-1 text-slate-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-base">LinkHub</span>
          </div>
          <button 
            onClick={() => setSubmitModalOpen(true)} 
            className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Submit
          </button>
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
        <div className="p-5 sm:p-8 lg:p-10 space-y-10 max-w-7xl mx-auto w-full">
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
          />

          {/* Latest Additions (shows when sites exist) */}
          <LatestAdditions
            websites={allWebsites}
            favorites={favorites}
            toggleBookmark={toggleBookmark}
            setTab={setTab}
          />
        </div>

        {/* Footer (Clean - no admin button) */}
        <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0a0f1d] py-6 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-3 transition-colors">
          <p>© 2026 LinkHub. All useful websites curated in one place.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 font-medium text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Sync
            </span>
          </div>
        </footer>
      </main>

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
