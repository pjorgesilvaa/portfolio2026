import { unstable_cache } from 'next/cache';
import BlogPost from '@/models/blogPost';
import { createServerSupabaseClient } from '../server';
import { maskStorageUrl } from '../storageUrl';

// Articles publish Mon/Wed/Fri — 1 hour ensures new posts show within the hour
const BLOG_TTL = 3600;

const SELECT_FIELDS = `
  id,
  title,
  slug,
  excerpt,
  content,
  status,
  language,
  cover_image_url,
  meta_title,
  meta_description,
  og_image_url,
  canonical_url,
  is_indexed,
  reading_time_minutes,
  published_at,
  created_at,
  updated_at,
  authors (
    id,
    name,
    email,
    avatar_url,
    bio,
    created_at,
    updated_at
  ),
  categories (
    id,
    name,
    slug,
    description,
    created_at,
    updated_at,
    sites (
      id,
      domain,
      created_at,
      updated_at
    )
  ),
  sites (
    id,
    domain,
    created_at,
    updated_at
  )
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): BlogPost {
  const author = Array.isArray(row.authors) ? row.authors[0] : row.authors;
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const site = Array.isArray(row.sites) ? row.sites[0] : row.sites;
  const categorySite = category
    ? Array.isArray(category.sites)
      ? category.sites[0]
      : category.sites
    : null;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    status: row.status,
    language: row.language ?? 'en-US',
    coverImageUrl: maskStorageUrl(row.cover_image_url),
    metaTitle: row.meta_title ?? row.title,
    metaDescription: row.meta_description ?? '',
    ogImageUrl: maskStorageUrl(row.og_image_url),
    canonicalUrl: row.canonical_url ?? '',
    isIndexed: row.is_indexed ?? false,
    readingTimeMinutes: row.reading_time_minutes ?? 0,
    publishedAt: new Date(row.published_at ?? row.created_at),
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    site: site
      ? { id: site.id, domain: site.domain, createdAt: new Date(site.created_at), updatedAt: new Date(site.updated_at) }
      : { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() },
    author: author
      ? {
          id: author.id,
          name: author.name,
          email: author.email ?? '',
          avatarUrl: maskStorageUrl(author.avatar_url),
          bio: author.bio ?? '',
          createdAt: new Date(author.created_at),
          updatedAt: new Date(author.updated_at),
        }
      : { id: '', name: '', email: '', avatarUrl: '', bio: '', createdAt: new Date(), updatedAt: new Date() },
    category: category
      ? {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description ?? '',
          createdAt: new Date(category.created_at),
          updatedAt: new Date(category.updated_at),
          site: categorySite
            ? { id: categorySite.id, domain: categorySite.domain, createdAt: new Date(categorySite.created_at), updatedAt: new Date(categorySite.updated_at) }
            : { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() },
        }
      : { id: '', name: '', slug: '', description: '', createdAt: new Date(), updatedAt: new Date(), site: { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() } },
  };
}

export const getPublishedArticles = unstable_cache(
  async (limit = 3, language = 'en-US'): Promise<BlogPost[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select(SELECT_FIELDS)
      .eq('status', 'published')
      .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
      .eq('language', language)
      .order('published_at', { ascending: false })
      .limit(limit);
    if (error) { console.error('[getPublishedArticles] Supabase error:', error.message); return []; }
    return (data ?? []).map(mapRow);
  },
  ['published-articles'],
  { revalidate: BLOG_TTL, tags: ['articles'] },
);

export const getAllPublishedArticles = unstable_cache(
  async (language = 'en-US'): Promise<BlogPost[]> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select(SELECT_FIELDS)
      .eq('status', 'published')
      .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
      .eq('language', language)
      .order('published_at', { ascending: false });
    if (error) { console.error('[getAllPublishedArticles] Supabase error:', error.message); return []; }
    return (data ?? []).map(mapRow);
  },
  ['all-published-articles'],
  { revalidate: BLOG_TTL, tags: ['articles'] },
);

export const ARTICLES_PER_PAGE = 6;

export const getArticlesWithFilters = unstable_cache(
  async ({
    page = 1,
    search = '',
    categoryId = '',
    sort = 'newest',
    language = 'en-US',
  }: {
    page?: number;
    search?: string;
    categoryId?: string;
    sort?: string;
    language?: string;
  }): Promise<{ posts: BlogPost[]; total: number }> => {
    const supabase = createServerSupabaseClient();
    const from = (page - 1) * ARTICLES_PER_PAGE;
    const to = from + ARTICLES_PER_PAGE - 1;
    let query = supabase
      .from('articles')
      .select(SELECT_FIELDS, { count: 'exact' })
      .eq('status', 'published')
      .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
      .eq('language', language);
    if (search.trim()) query = query.or(`title.ilike.%${search.trim()}%,excerpt.ilike.%${search.trim()}%`);
    if (categoryId.trim()) query = query.eq('category_id', categoryId.trim());
    switch (sort) {
      case 'oldest':   query = query.order('published_at',        { ascending: true });  break;
      case 'shortest': query = query.order('reading_time_minutes', { ascending: true });  break;
      case 'longest':  query = query.order('reading_time_minutes', { ascending: false }); break;
      default:         query = query.order('published_at',        { ascending: false });
    }
    const { data, count, error } = await query.range(from, to);
    if (error) { console.error('[getArticlesWithFilters] Supabase error:', error.message); return { posts: [], total: 0 }; }
    return { posts: (data ?? []).map(mapRow), total: count ?? 0 };
  },
  ['articles-with-filters'],
  { revalidate: BLOG_TTL, tags: ['articles'] },
);

export const getArticleBySlug = unstable_cache(
  async (slug: string, language = 'en-US'): Promise<BlogPost | null> => {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('articles')
      .select(SELECT_FIELDS)
      .eq('slug', slug)
      .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
      .eq('language', language)
      .single();
    if (error || !data) return null;
    return mapRow(data);
  },
  ['article-by-slug'],
  { revalidate: BLOG_TTL, tags: ['articles'] },
);
