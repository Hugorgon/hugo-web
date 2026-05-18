import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { Container } from './Container';
import { type FooterLink } from '../../data/navigation';
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

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly FooterLink[];
}): ReactNode {
  return (
    <div>
      <h3 className="text-[#F9FAFB] font-semibold mb-4">{heading}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-[#9CA3AF] hover:text-[#F59E0B] transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  // Initial state z local fallbacku — Footer je v každé stránce, první
  // render musí být sync (žádný flash prázdného footeru).
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

  return (
    <footer className="bg-[#111214] border-t border-[#2A2B31]">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              to={ROUTES.home}
              className="flex items-center gap-2 mb-4"
              aria-label={`${site.brand.name} ${site.brand.suffix} ${UI.nav.homeAriaSuffix}`}
            >
              <h2 className="text-2xl font-bold text-[#F9FAFB]">{site.brand.name}</h2>
              <span className="text-[#F59E0B] text-sm">{site.brand.suffix}</span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              {site.description}
            </p>
          </div>

          <LinkColumn
            heading={navigation.footerColumns.explore.heading}
            links={navigation.footerColumns.explore.links}
          />
          <LinkColumn
            heading={navigation.footerColumns.categories.heading}
            links={navigation.footerColumns.categories.links}
          />

          <div>
            <h3 className="text-[#F9FAFB] font-semibold mb-4">
              {navigation.footerColumns.social.heading}
            </h3>
            <div className="flex gap-4">
              {navigation.footerColumns.social.links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(event) => event.preventDefault()}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-[#161618] border border-[#2A2B31] flex items-center justify-center text-[#9CA3AF] hover:text-[#F59E0B] hover:border-[#F59E0B] transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2A2B31] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-sm">{site.copyright}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navigation.footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-[#9CA3AF] hover:text-[#F59E0B] transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
