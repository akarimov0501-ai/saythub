import { 
  Sparkles, 
  PenTool, 
  Code2, 
  CheckSquare, 
  GraduationCap, 
  Wallet, 
  PlaySquare 
} from 'lucide-react';

export const PRIMARY_CATEGORIES = [
  { 
    id: 'ai', 
    name: 'AI Tools', 
    aliases: ['ai', 'ai tools', 'artificial intelligence'],
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400', 
    icon: Sparkles 
  },
  { 
    id: 'design', 
    name: 'Design', 
    aliases: ['design', 'dizayn', 'ui/ux'],
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400', 
    icon: PenTool 
  },
  { 
    id: 'development', 
    name: 'Development', 
    aliases: ['development', 'dasturlash', 'dev', 'coding'],
    color: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400', 
    icon: Code2 
  },
];

export const SECONDARY_CATEGORIES = [
  { 
    id: 'productivity', 
    name: 'Productivity', 
    aliases: ['productivity', 'samaradorlik'],
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', 
    icon: CheckSquare 
  },
  { 
    id: 'education', 
    name: 'Education', 
    aliases: ['education', 'ta\'lim'],
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', 
    icon: GraduationCap 
  },
  { 
    id: 'finance', 
    name: 'Finance', 
    aliases: ['finance', 'moliya'],
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400', 
    icon: Wallet 
  },
  { 
    id: 'entertainment', 
    name: 'Entertainment', 
    aliases: ['entertainment', 'ko\'ngilochar'],
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400', 
    icon: PlaySquare 
  }
];

export const ALL_CATEGORIES = [...PRIMARY_CATEGORIES, ...SECONDARY_CATEGORIES];

/**
 * Universal, consistent category matcher used by both Categories component
 * and App filtering logic so numbers always 100% match real results.
 */
export function matchesCategory(site, filterCategory) {
  if (!filterCategory || filterCategory === 'all') return true;
  const f = filterCategory.toLowerCase().trim();
  const sCat = (site.category || '').toLowerCase().trim();

  // Find target category configuration
  const matchedConfig = ALL_CATEGORIES.find(
    (c) => c.name.toLowerCase() === f || c.id === f || c.aliases.includes(f)
  );

  if (matchedConfig) {
    return (
      sCat === matchedConfig.id ||
      sCat === matchedConfig.name.toLowerCase() ||
      matchedConfig.aliases.includes(sCat)
    );
  }

  return sCat === f;
}
