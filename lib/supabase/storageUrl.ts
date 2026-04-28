const STORAGE_PREFIX = `${process.env.SUPABASE_URL}/storage/v1/object/public/`;

/**
 * Replaces the full Supabase storage URL with a local /img/ proxy path.
 * e.g. https://xyz.supabase.co/storage/v1/object/public/bucket/a.png → /img/bucket/a.png
 */
export function maskStorageUrl(url: string | null | undefined): string {
  if (!url) return '';
  return url.startsWith(STORAGE_PREFIX) ? '/img/' + url.slice(STORAGE_PREFIX.length) : url;
}
