import BlogPost from '@/models/blogPost';
import { createServerSupabaseClient } from '../server';

export async function getPublishedArticles(limit = 3): Promise<BlogPost[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select(`
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
    `)
    .eq('status', 'published')
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[getPublishedArticles] Supabase error:', error.message);
    return [];
  }

  console.log('[getPublishedArticles] Raw data from Supabase:', data);

  return (data ?? []).map(row => {
    const author = Array.isArray(row.authors) ? row.authors[0] : row.authors;
    const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
    const site = Array.isArray(row.sites) ? row.sites[0] : row.sites;
    const categorySite = category
      ? Array.isArray((category as any).sites)
        ? (category as any).sites[0]
        : (category as any).sites
      : null;

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt ?? '',
      content: row.content ?? '',
      status: row.status,
      language: row.language ?? 'en',
      coverImageUrl: row.cover_image_url ?? '',
      metaTitle: row.meta_title ?? row.title,
      metaDescription: row.meta_description ?? '',
      ogImageUrl: row.og_image_url ?? '',
      canonicalUrl: row.canonical_url ?? '',
      isIndexed: row.is_indexed ?? false,
      readingTimeMinutes: row.reading_time_minutes ?? 0,
      publishedAt: new Date(row.published_at ?? row.created_at),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      site: site
        ? {
            id: site.id,
            domain: site.domain,
            createdAt: new Date(site.created_at),
            updatedAt: new Date(site.updated_at),
          }
        : { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() },
      author: author
        ? {
            id: author.id,
            name: author.name,
            email: author.email ?? '',
            avatarUrl: author.avatar_url ?? '',
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
              ? {
                  id: categorySite.id,
                  domain: categorySite.domain,
                  createdAt: new Date(categorySite.created_at),
                  updatedAt: new Date(categorySite.updated_at),
                }
              : { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() },
          }
        : {
            id: '',
            name: '',
            slug: '',
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            site: { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() },
          },
    } satisfies BlogPost;
  });
}
