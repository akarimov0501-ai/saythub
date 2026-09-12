import { firestore } from './firebase';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { initialWebsites, curatedWebsites } from '../data/websites';

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
      likesCount: Number(siteData.likesCount) || 0,
      iconType: siteData.iconType || 'custom',
      logoUrl: siteData.logoUrl || '',
      createdAt: siteData.createdAt || new Date().toISOString()
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

  // Toggle Upvote / Like website (strictly 1 like per user)
  async toggleUpvoteWebsite(id, willBeLiked, newLikesCount) {
    try {
      await setDoc(doc(firestore, 'websites', id), { likesCount: newLikesCount }, { merge: true });
    } catch (err) {
      console.warn('Firestore toggle upvote error, saving locally:', err);
    }

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      if (saved) {
        const list = JSON.parse(saved).map(s => s.id === id ? { ...s, likesCount: newLikesCount } : s);
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.error(e);
    }
    return newLikesCount;
  },

  // Legacy fallback
  async upvoteWebsite(id, currentLikes = 0) {
    return this.toggleUpvoteWebsite(id, true, (Number(currentLikes) || 0) + 1);
  },

  // Seed curated websites to Firestore and Local Storage
  async seedCuratedWebsites(sitesToSeed = curatedWebsites) {
    const seeded = [];
    for (const site of sitesToSeed) {
      const formattedSite = {
        ...site,
        createdAt: site.createdAt || new Date().toISOString()
      };
      try {
        await setDoc(doc(firestore, 'websites', site.id), formattedSite);
      } catch (err) {
        console.error('Failed to seed site to firestore:', site.id, err);
      }
      seeded.push(formattedSite);
    }

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      const existing = saved ? JSON.parse(saved) : [];
      const map = new Map();
      existing.forEach(s => map.set(s.id, s));
      seeded.forEach(s => map.set(s.id, s));
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(Array.from(map.values())));
    } catch (e) {
      console.error(e);
    }

    return seeded;
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
  },

  // Submit a website by community / visitor
  async submitWebsite(submissionData) {
    const id = 'sub-' + Date.now();
    const newSubmission = {
      id,
      name: submissionData.name,
      url: submissionData.url.startsWith('http') ? submissionData.url : `https://${submissionData.url}`,
      logoUrl: submissionData.logoUrl || '',
      category: submissionData.category || 'AI',
      description: submissionData.description || 'Foydalanuvchi tomonidan taklif etilgan foydali sayt.',
      tags: submissionData.tags || [submissionData.category || 'AI'],
      submitterName: submissionData.submitterName || 'Foydalanuvchi',
      submitterEmail: submissionData.submitterEmail || '',
      submitterAvatar: submissionData.submitterAvatar || '',
      status: 'pending', // pending | approved | rejected
      createdAt: new Date().toISOString()
    };

    // 1. Always store in local storage first
    try {
      const saved = localStorage.getItem('linkhub_submissions');
      const list = saved ? JSON.parse(saved) : [];
      localStorage.setItem('linkhub_submissions', JSON.stringify([newSubmission, ...list]));
    } catch (e) {
      console.error(e);
    }

    // 2. Save to Firestore
    try {
      await setDoc(doc(firestore, 'submissions', id), newSubmission);
    } catch (err) {
      console.warn('Firestore submission error, stored locally:', err);
    }

    return newSubmission;
  },

  // Fetch all submissions for Admin Moderation (merges Firestore and local storage)
  async getSubmissions() {
    let cloudSubs = [];
    try {
      const subRef = collection(firestore, 'submissions');
      const snapshot = await getDocs(subRef);

      if (!snapshot.empty) {
        snapshot.forEach((docSnap) => {
          cloudSubs.push({
            id: docSnap.id,
            ...docSnap.data()
          });
        });
      }
    } catch (err) {
      console.warn('Firestore getSubmissions error, using local fallback:', err);
    }

    let localSubs = [];
    try {
      const saved = localStorage.getItem('linkhub_submissions');
      if (saved) localSubs = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    // Merge by id (cloud takes precedence, but keep any local ones that haven't synced yet)
    const map = new Map();
    localSubs.forEach(item => { if (item && item.id) map.set(item.id, item); });
    cloudSubs.forEach(item => { if (item && item.id) map.set(item.id, item); });

    const merged = Array.from(map.values());
    merged.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return merged;
  },

  // Realtime subscription to submissions
  subscribeToSubmissions(callback) {
    try {
      const subRef = collection(firestore, 'submissions');
      return onSnapshot(subRef, (snapshot) => {
        const cloudSubs = [];
        snapshot.forEach((docSnap) => {
          cloudSubs.push({
            id: docSnap.id,
            ...docSnap.data()
          });
        });

        let localSubs = [];
        try {
          const saved = localStorage.getItem('linkhub_submissions');
          if (saved) localSubs = JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }

        const map = new Map();
        localSubs.forEach(item => { if (item && item.id) map.set(item.id, item); });
        cloudSubs.forEach(item => { if (item && item.id) map.set(item.id, item); });

        const merged = Array.from(map.values());
        merged.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        callback(merged);
      }, (err) => {
        console.warn('Submissions snapshot listener error:', err);
      });
    } catch (e) {
      console.error('Failed to subscribe to submissions:', e);
      return () => {};
    }
  },

  // Approve submission (creates site in websites catalog and marks submission as approved)
  async approveSubmission(submissionId, sitePayload) {
    // 1. Create active website in catalog
    const createdSite = await this.createWebsite({
      ...sitePayload,
      new: true,
      popular: false,
      trending: false
    });

    // 2. Update status in submissions collection
    try {
      await setDoc(doc(firestore, 'submissions', submissionId), {
        status: 'approved',
        approvedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error('Firestore update submission status error:', err);
    }

    try {
      const saved = localStorage.getItem('linkhub_submissions');
      if (saved) {
        const list = JSON.parse(saved).map(s => 
          s.id === submissionId ? { ...s, status: 'approved', approvedAt: new Date().toISOString() } : s
        );
        localStorage.setItem('linkhub_submissions', JSON.stringify(list));
      }
    } catch (e) {
      console.error(e);
    }

    return createdSite;
  },

  // Reject submission
  async rejectSubmission(submissionId) {
    try {
      await setDoc(doc(firestore, 'submissions', submissionId), {
        status: 'rejected',
        rejectedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error('Firestore reject submission error:', err);
    }

    try {
      const saved = localStorage.getItem('linkhub_submissions');
      if (saved) {
        const list = JSON.parse(saved).map(s => 
          s.id === submissionId ? { ...s, status: 'rejected', rejectedAt: new Date().toISOString() } : s
        );
        localStorage.setItem('linkhub_submissions', JSON.stringify(list));
      }
    } catch (e) {
      console.error(e);
    }
  },

  // Delete submission
  async deleteSubmission(submissionId) {
    try {
      await deleteDoc(doc(firestore, 'submissions', submissionId));
    } catch (err) {
      console.error('Firestore delete submission error:', err);
    }

    try {
      const saved = localStorage.getItem('linkhub_submissions');
      if (saved) {
        const list = JSON.parse(saved).filter(s => s.id !== submissionId);
        localStorage.setItem('linkhub_submissions', JSON.stringify(list));
      }
    } catch (e) {
      console.error(e);
    }
  }
};
