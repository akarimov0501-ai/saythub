import { supabase, isSupabaseConfigured } from './supabase';
import { initialWebsites } from '../data/websites';

const LOCAL_STORAGE_CUSTOM_KEY = 'linkhub_custom_sites';
const LOCAL_STORAGE_FAVORITES_KEY = 'linkhub_favorites';

export const db = {
  isCloudConnected: isSupabaseConfigured,

  // Fetch all websites
  async getWebsites() {
    // 1. If Supabase is connected, try loading from cloud database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            category: row.category,
            tags: row.tags || [row.category],
            tagColors: row.tag_colors || ['bg-slate-100 text-slate-600 border-slate-200'],
            url: row.url,
            popular: Boolean(row.popular),
            trending: Boolean(row.trending),
            new: Boolean(row.is_new),
            iconType: row.icon_type || 'custom',
          }));
        }
      } catch (err) {
        console.warn('Could not fetch from Supabase, falling back to local data:', err);
      }
    }

    // 2. Fallback to LocalStorage + Default Curated Sites
    let customSites = [];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      if (saved) customSites = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    return [...initialWebsites, ...customSites];
  },

  // Save a new website
  async createWebsite(siteData) {
    const newSite = {
      id: 'site-' + Date.now(),
      name: siteData.name,
      description: siteData.description || 'User curated website.',
      category: siteData.category,
      tags: [siteData.category, 'Custom'],
      tagColors: ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
      url: siteData.url,
      popular: false,
      trending: false,
      new: true,
      iconType: 'custom',
    };

    // If Supabase is connected, insert into cloud database
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('websites').insert([
          {
            id: newSite.id,
            name: newSite.name,
            description: newSite.description,
            category: newSite.category,
            tags: newSite.tags,
            tag_colors: newSite.tagColors,
            url: newSite.url,
            popular: newSite.popular,
            trending: newSite.trending,
            is_new: newSite.new,
            icon_type: newSite.iconType,
          }
        ]);
        if (error) console.warn('Supabase insert error:', error);
      } catch (err) {
        console.error('Error inserting to Supabase:', err);
      }
    }

    // Always persist to local storage as fallback
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      const customList = saved ? JSON.parse(saved) : [];
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify([newSite, ...customList]));
    } catch (e) {
      console.error(e);
    }

    return newSite;
  },

  // Get Favorites
  async getFavorites() {
    let localFavs = [];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      if (saved) localFavs = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('user_favorites')
          .select('site_id')
          .eq('user_id', 'anonymous');

        if (!error && data) {
          const cloudFavs = data.map((d) => d.site_id);
          // Merge unique
          return Array.from(new Set([...localFavs, ...cloudFavs]));
        }
      } catch (err) {
        console.warn('Failed to load favorites from Supabase:', err);
      }
    }

    return localFavs;
  },

  // Toggle Favorite
  async toggleFavorite(siteId, willBeFavorite) {
    // Local storage update
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      let list = saved ? JSON.parse(saved) : [];
      if (willBeFavorite) {
        if (!list.includes(siteId)) list.push(siteId);
      } else {
        list = list.filter((id) => id !== siteId);
      }
      localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    // Supabase update if connected
    if (isSupabaseConfigured && supabase) {
      try {
        if (willBeFavorite) {
          await supabase.from('user_favorites').insert([{ site_id: siteId, user_id: 'anonymous' }]);
        } else {
          await supabase
            .from('user_favorites')
            .delete()
            .eq('site_id', siteId)
            .eq('user_id', 'anonymous');
        }
      } catch (err) {
        console.warn('Supabase favorite toggle error:', err);
      }
    }
  }
};
