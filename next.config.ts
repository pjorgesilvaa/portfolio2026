import type { NextConfig } from "next";

const SUPABASE_URL = process.env.SUPABASE_URL!;

// ── Security headers ─────────────────────────────────────────────────────────
const CSP = [
  "default-src 'self'",
  // Next.js hydration + GTM/Clarity both require unsafe-inline.
  // GTM in particular injects arbitrary inline scripts by design.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",
  // Tailwind / next/font inject inline styles
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Images come from same-origin (/img/ rewrite); data: covers inline SVG
  "img-src 'self' data: blob:",
  // Outbound XHR/fetch: analytics beacons + Clarity telemetry
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.clarity.ms https://dc.services.visualstudio.com",
  // No frames, no plugins, no dynamic base URL
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  // Only allow form submissions to same origin
  "form-action 'self'",
  // Force HTTPS for any mixed-content sub-requests
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  // HSTS — tell browsers to always use HTTPS for 2 years
  { key: "Strict-Transport-Security",  value: "max-age=63072000; includeSubDomains; preload" },
  // Belt-and-suspenders framing protection (older browsers ignore CSP)
  { key: "X-Frame-Options",            value: "DENY" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options",     value: "nosniff" },
  // Send origin only, never the full URL, on cross-origin requests
  { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
  // Lock down browser features we don't use
  { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy",    value: CSP },
];
// ─────────────────────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/img/:path*",
        destination: `${SUPABASE_URL}/storage/v1/object/public/:path*`,
      },
    ];
  },
};

export default nextConfig;
