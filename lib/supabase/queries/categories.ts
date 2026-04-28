import { createServerSupabaseClient } from '../server';

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export async function getCategories(language = 'en-US'): Promise<CategoryOption[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .eq('language', language)
    .order('name');

  if (error) {
    console.error('[getCategories] Supabase error:', error.message);
    return [];
  }

  return data ?? [];
}
