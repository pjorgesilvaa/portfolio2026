type AnalyticsEvent =
  | { event: 'contact_form_submit' }
  | { event: 'contact_form_error' }
  | { event: 'resume_download' }
  | { event: 'language_switch'; from_locale: string; to_locale: string }
  | { event: 'project_click'; project_title: string; project_slug: string }
  | { event: 'project_github_click'; project_title: string; project_slug: string }
  | { event: 'project_live_click'; project_title: string; project_slug: string }
  | { event: 'email_click' };

export function trackEvent(data: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const { event, ...params } = data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  // Send directly to GA4 via gtag (loaded by @next/third-parties/google <GoogleAnalytics>)
  if (typeof w.gtag === 'function') {
    w.gtag('event', event, params);
  }
}
