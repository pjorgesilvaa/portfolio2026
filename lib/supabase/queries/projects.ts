import Project from '@/models/project';
import { createServerSupabaseClient } from '../server';
import { maskStorageUrl } from '../storageUrl';

const SELECT_FIELDS = `
  id,
  slug,
  title,
  excerpt,
  description,
  tags,
  bannerUrl,
  project_git_url,
  project_deployed_url,
  language,
  created_at,
  updated_at,
  sites (
    id,
    domain,
    created_at,
    updated_at
  )
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Project {
  const site = Array.isArray(row.sites) ? row.sites[0] : row.sites;

  // tags may be stored as a JSON array string or comma-separated — handle both
  let tags: string[] = [];
  if (Array.isArray(row.tags)) {
    tags = row.tags;
  } else if (typeof row.tags === 'string' && row.tags.trim()) {
    try {
      const parsed = JSON.parse(row.tags);
      tags = Array.isArray(parsed) ? parsed : [row.tags];
    } catch {
      tags = row.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    description: row.description ?? '',
    tags,
    bannerUrl: maskStorageUrl(row.bannerUrl),
    projectGitUrl: row.project_git_url ?? null,
    projectDeployedUrl: row.project_deployed_url ?? null,
    language: row.language ?? 'en-US',
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    site: site
      ? { id: site.id, domain: site.domain, createdAt: new Date(site.created_at), updatedAt: new Date(site.updated_at) }
      : { id: '', domain: '', createdAt: new Date(), updatedAt: new Date() },
  };
}

export async function getProjects(limit = 4, language = 'en-US'): Promise<Project[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_FIELDS)
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .eq('language', language)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[getProjects] Supabase error:', error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

/**
 * Fetch specific projects by slug, preserving the order of the input array.
 * Pass null for empty placeholder slots.
 */
export async function getProjectsBySlots(slots: (string | null)[], language = 'en-US'): Promise<(Project | null)[]> {
  const supabase = createServerSupabaseClient();

  const slugs = slots.filter((s): s is string => s !== null);
  if (slugs.length === 0) return slots.map(() => null);

  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_FIELDS)
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .eq('language', language)
    .in('slug', slugs);

  if (error) {
    console.error('[getProjectsBySlots] Supabase error:', error.message);
    return slots.map(() => null);
  }

  const bySlug = new Map((data ?? []).map(mapRow).map(p => [p.slug, p]));
  return slots.map(slug => (slug ? (bySlug.get(slug) ?? null) : null));
}

export async function getProjectBySlug(slug: string, language = 'en-US'): Promise<Project | null> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_FIELDS)
    .eq('slug', slug)
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .eq('language', language)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export const PROJECTS_PER_PAGE = 6;

export async function getAllProjects(language = 'en-US'): Promise<Project[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_FIELDS)
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .eq('language', language)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getAllProjects] Supabase error:', error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

export async function getProjectsWithFilters({
  page = 1,
  search = '',
  sort = 'newest',
  language = 'en-US',
}: {
  page?: number;
  search?: string;
  sort?: string;
  language?: string;
}): Promise<{ projects: Project[]; total: number }> {
  const supabase = createServerSupabaseClient();

  const from = (page - 1) * PROJECTS_PER_PAGE;
  const to = from + PROJECTS_PER_PAGE - 1;

  let query = supabase
    .from('projects')
    .select(SELECT_FIELDS, { count: 'exact' })
    .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID)
    .eq('language', language);

  if (search.trim()) {
    query = query.or(`title.ilike.%${search.trim()}%,excerpt.ilike.%${search.trim()}%`);
  }

  switch (sort) {
    case 'oldest': query = query.order('created_at', { ascending: true });  break;
    case 'a-z':    query = query.order('title',      { ascending: true });  break;
    case 'z-a':    query = query.order('title',      { ascending: false }); break;
    default:       query = query.order('created_at', { ascending: false });
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    console.error('[getProjectsWithFilters] Supabase error:', error.message);
    return { projects: [], total: 0 };
  }

  return { projects: (data ?? []).map(mapRow), total: count ?? 0 };
}
