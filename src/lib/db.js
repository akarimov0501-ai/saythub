import { firestore } from './firebase';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { initialWebsites } from '../data/websites';

const LOCAL_STORAGE_CUSTOM_KEY = 'linkhub_custom_sites';
const LOCAL_STORAGE_FAVORITES_KEY = 'linkhub_favorites';

export const db = {
  isCloudConnected: true,
  cloudProvider: 'Firebase Firestore',

  // Fetch all websites from Firestore
  async getWebsites() {
    try {
      const websitesRef = collection(firestore, 'websites');
      const q = query(websitesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const sites = [];
        snapshot.forEach((docSnap) => {
          sites.push({
            id: docSnap.id,
            ...docSnap.data(),
          });
        });
        return sites;
      }
    } catch (err) {
      console.warn('Firestore fetch error, using local fallback:', err);
    }

    // Fallback to local
    let customSites = [];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      if (saved) customSites = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [...initialWebsites, ...customSites];
  },

  // Create or add a new website to Firestore
  async createWebsite(siteData) {
    const id = siteData.id || ('site-' + Date.now());
    const newSite = {
      id,
      name: siteData.name,
      description: siteData.description || 'Foydalanuvchi tomonidan kiritilgan sayt.',
      category: siteData.category || 'AI',
      tags: siteData.tags || [siteData.category || 'AI', 'Custom'],
      tagColors: siteData.tagColors || ['bg-sky-50 text-sky-700 border-sky-200', 'bg-slate-100 text-slate-600 border-slate-200'],
      url: siteData.url,
      popular: Boolean(siteData.popular),
      trending: Boolean(siteData.trending),
      new: siteData.new !== undefined ? Boolean(siteData.new) : true,
      iconType: siteData.iconType || 'custom',
      logoUrl: siteData.logoUrl || '',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(firestore, 'websites', id), newSite);
    } catch (err) {
      console.error('Firestore setDoc error:', err);
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

  // Delete a website from Firestore (for Admin Panel)
  async deleteWebsite(id) {
    try {
      await deleteDoc(doc(firestore, 'websites', id));
    } catch (err) {
      console.error('Firestore deleteDoc error:', err);
    }

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      if (saved) {
        const filtered = JSON.parse(saved).filter((s) => s.id !== id);
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.error(e);
    }
  },

  // Update a website in Firestore (for Admin Panel)
  async updateWebsite(id, updatedData) {
    try {
      await setDoc(doc(firestore, 'websites', id), updatedData, { merge: true });
    } catch (err) {
      console.error('Firestore update error:', err);
    }
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

    try {
      const favRef = collection(firestore, 'user_favorites');
      const snap = await getDocs(favRef);
      if (!snap.empty) {
        const cloudFavs = snap.docs.map((d) => d.data().siteId);
        return Array.from(new Set([...localFavs, ...cloudFavs]));
      }
    } catch (err) {
      console.warn('Firestore favorites error:', err);
    }

    return localFavs;
  },

  // Toggle Favorite
  async toggleFavorite(siteId, willBeFavorite) {
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

    try {
      const favDocRef = doc(firestore, 'user_favorites', `anon_${siteId}`);
      if (willBeFavorite) {
        await setDoc(favDocRef, {
          siteId,
          userId: 'anonymous',
          createdAt: new Date().toISOString()
        });
      } else {
        await deleteDoc(favDocRef);
      }
    } catch (err) {
      console.warn('Firestore fav toggle error:', err);
    }
  }
};
