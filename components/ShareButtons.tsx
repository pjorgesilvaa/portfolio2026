'use client';

import { trackEvent } from '@/lib/analytics';

interface Props {
  url: string;
  title: string;
  postSlug: string;
  label: string;
}

export default function ShareButtons({ url, title, postSlug, label }: Props) {
  async function handleShare() {
    if (typeof navigator === 'undefined') return;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        trackEvent({ event: 'blog_post_share', post_title: title, post_slug: postSlug, channel: 'native' });
      } catch {
        // User dismissed the sheet — not an error
      }
    } else {
      // Fallback: copy to clipboard for browsers without Web Share API
      await navigator.clipboard.writeText(url);
      trackEvent({ event: 'blog_post_share', post_title: title, post_slug: postSlug, channel: 'copy_link' });
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity duration-200"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {label}
    </button>
  );
}
