import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Container } from './Container';
import { LinkButton } from './LinkButton';
import { type NavLink } from '../../data/navigation';
import { ROUTES } from '../../data/routes';
import { UI } from '../../data/ui';
import {
  fetchSiteSettings,
  LOCAL_SITE_SETTINGS,
  type SiteSettings,
} from '../../lib/queries/siteSettings';
import {
  fetchNavigation,
  LOCAL_NAVIGATION,
  type NavigationData,
} from '../../lib/queries/navigation';

const linkBase =
  'transition-colors duration-200 ease-soft';
const linkRest = 'text-[#D1D5DB] hover:text-[#F59E0B]';
const linkActive = 'text-[#F59E0B]';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Initial state z local fallbacku — Navbar je v každé stránce a první
  // render musí být sync (žádný flash prázdného navbaru). Sanity přepíše
  // state až po async fetchi (pokud singleton existuje).
  const [site, setSite] = useState<SiteSettings>(LOCAL_SITE_SETTINGS);
  const [navigation, setNavigation] = useState<NavigationData>(LOCAL_NAVIGATION);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings().then((data) => {
      if (!cancelled && data) setSite(data);
    });
    fetchNavigation().then((data) => {
      if (!cancelled && data) setNavigation(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Slightly more opaque navbar background once the user starts scrolling.
  // Very subtle — 80% → 90% alpha over 200ms.
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 16);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Auto-close the mobile menu on navigation.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function isLinkActive(link: NavLink): boolean {
    if (link.kind !== 'route') return false;
    if (link.to === ROUTES.home) return pathname === ROUTES.home;
    return pathname === link.to || pathname.startsWith(`${link.to}/`);
  }

  const closeMenu = () => setIsOpen(false);
  const bgClass = scrolled ? 'bg-[#0A0A0B]/90' : 'bg-[#0A0A0B]/80';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${bgClass} backdrop-blur-lg border-b border-[#2A2B31] transition-colors duration-300 ease-soft`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-2 rounded-md"
            aria-label={`${site.brand.name} ${site.brand.suffix} ${UI.nav.homeAriaSuffix}`}
          >
            <h1 className="text-2xl font-bold text-[#F9FAFB]">{site.brand.name}</h1>
            <span className="text-[#F59E0B] text-sm">{site.brand.suffix}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${linkBase} ${active ? linkActive : linkRest}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LinkButton to={navigation.navbarCta.to}>{navigation.navbarCta.label}</LinkButton>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? UI.nav.closeMenu : UI.nav.openMenu}
            className="md:hidden p-2 -mr-2 rounded-lg text-[#F9FAFB] hover:text-[#F59E0B] transition-colors duration-200 ease-soft"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#2A2B31] animate-mobile-menu-enter">
            <div className="flex flex-col gap-4">
              {navigation.navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={`${linkBase} ${active ? linkActive : linkRest}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <LinkButton
                  to={navigation.navbarCta.to}
                  onClick={closeMenu}
                  className="w-full"
                >
                  {navigation.navbarCta.label}
                </LinkButton>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
