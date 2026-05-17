import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Route-change scroll behaviour.
 * - When the URL contains a hash (e.g. `/#about`), smooth-scroll to that anchor
 *   once the next paint lands so the target element exists in the DOM.
 * - Otherwise, jump to the top of the page on navigation.
 *
 * Mount once inside the router. Renders nothing.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      // Defer one frame so the destination route has rendered.
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
