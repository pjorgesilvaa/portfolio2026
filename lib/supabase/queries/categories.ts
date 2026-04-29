import { unstable_cache } from 'next/cache';
import { createServerSupabaseClient } from '../server';

// Categories change very rarely — 7 days TTL
const CATEGORY_TTL = 604800;

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export const getCategories = unstable_cache(
  async (language = 'en-US'): Promise<CategoryOption[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
      .eq('language', language)
      .order('name');
    if (error) { console.error('[getCategories] Supabase error:', error.message); return []; }
    return data ?? [];
  },
  ['categories'],
  { revalidate: CATEGORY_TTL, tags: ['categories'] },
);
