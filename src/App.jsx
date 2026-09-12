import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, Plus, Cloud, Database } from 'lucide-react';
import { initialWebsites } from './data/websites';
import { db } from './lib/db';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedWebsites from './components/FeaturedWebsites';
import LatestAdditions from './components/LatestAdditions';
import CreateModal from './components/CreateModal';
import Toast from './components/Toast';

export default function App() {
  const [allWebsites, setAllWebsites] = useState(initialWebsites);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilterCategory, setFilterCategory] = useState('all');
  const [currentTab, setTab] = useState('popular');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const searchInputRef = useRef(null);

  // Initial Load from Database (Cloud or Local fallback)
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [sites, favs] = await Promise.all([
          db.getWebsites(),
          db.getFavorites()
        ]);
        if (sites && sites.length > 0) {
          setAllWebsites(sites);
        }
        if (favs) {
          setFavorites(favs);
        }
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
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

  // Add Custom Website / Collection
  const handleAddWebsite = async (newSiteData) => {
    try {
      const created = await db.createWebsite(newSiteData);
      setAllWebsites((prev) => [created, ...prev]);
      triggerToast("Website added to your collection!", '✓');
    } catch (err) {
      console.error(err);
      triggerToast("Error saving website", '✕');
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
        site.description.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (currentFilterCategory !== 'all') {
      const cat = currentFilterCategory.toLowerCase();
      list = list.filter((site) =>
        site.category.toLowerCase().includes(cat) ||
        site.tags.some((t) => t.toLowerCase().includes(cat))
      );
    }

    // Tab filter
    if (currentTab === 'new') {
      list = list.filter((site) => site.new || site.id === 'unsplash');
    } else if (currentTab === 'trending') {
      list = list.filter((site) => site.trending);
    } else if (currentTab === 'favorites_only') {
      list = list.filter((site) => favorites.includes(site.id));
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex antialiased selection:bg-sky-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setTab={setTab}
        currentFilterCategory={currentFilterCategory}
        setFilterCategory={setFilterCategory}
        favoritesCount={favorites.length}
        openCreateModal={() => setCreateModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        closeMobileSidebar={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 lg:ml-72 min-w-0 flex flex-col">
        {/* Mobile Header */}
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
            onClick={() => setCreateModalOpen(true)} 
            className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Site
          </button>
        </div>

        {/* Cosmic Hero Banner */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentFilterCategory={currentFilterCategory}
          setFilterCategory={setFilterCategory}
          searchInputRef={searchInputRef}
        />

        {/* Content Body */}
        <div className="p-5 sm:p-8 lg:p-10 space-y-10 max-w-7xl mx-auto w-full">
          {/* Categories */}
          <Categories
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

          {/* Latest Additions */}
          <LatestAdditions
            favorites={favorites}
            toggleBookmark={toggleBookmark}
            setTab={setTab}
          />
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 LinkHub. All useful websites curated in one place.</p>
          <div className="flex items-center gap-2">
            {db.isCloudConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                <Cloud className="w-3 h-3 text-emerald-600" />
                Supabase Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-medium text-[11px]">
                <Database className="w-3 h-3 text-slate-400" />
                Local & Cloud Ready
              </span>
            )}
          </div>
        </footer>
      </main>

      {/* Create Modal Dialog */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAddWebsite={handleAddWebsite}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
