'use client';

import { useEffect } from 'react';

const STORAGE_KEY = '_device_id';

/**
 * Assigns a stable device ID to every browser installation and passes it to
 * Microsoft Clarity via clarity('identify', id). This means Clarity treats the
 * same browser as the same "user" across page navigations and full reloads,
 * instead of generating a new anonymous ID on every session.
 *
 * The ID lives in localStorage, so it survives refreshes and URL changes but is
 * scoped to the browser — not the person. If the user clears their browser data,
 * a new ID is generated and Clarity treats it as a new device.
 */
export default function ClarityIdentify() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get or create the device ID
    let deviceId = localStorage.getItem(STORAGE_KEY);
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, deviceId);
    }

    // Wait for Clarity to be available, then identify
    const identify = () => {
      const w = window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      if (typeof w.clarity === 'function') {
        w.clarity('identify', deviceId);
      }
    };

    // Clarity loads async — retry a few times if it isn't ready yet
    identify();
    const t1 = setTimeout(identify, 500);
    const t2 = setTimeout(identify, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
