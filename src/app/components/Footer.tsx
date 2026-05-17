import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Container } from './Container';
import { SITE } from '../../data/site';
import {
  FOOTER_COLUMNS,
  FOOTER_LEGAL_LINKS,
  type FooterLink,
} from '../../data/navigation';
import { ROUTES } from '../../data/routes';
import { UI } from '../../data/ui';

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
  return (
    <footer className="bg-[#111214] border-t border-[#2A2B31]">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              to={ROUTES.home}
              className="flex items-center gap-2 mb-4"
              aria-label={`${SITE.brand.name} ${SITE.brand.suffix} ${UI.nav.homeAriaSuffix}`}
            >
              <h2 className="text-2xl font-bold text-[#F9FAFB]">{SITE.brand.name}</h2>
              <span className="text-[#F59E0B] text-sm">{SITE.brand.suffix}</span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              {SITE.description}
            </p>
          </div>

          <LinkColumn
            heading={FOOTER_COLUMNS.explore.heading}
            links={FOOTER_COLUMNS.explore.links}
          />
          <LinkColumn
            heading={FOOTER_COLUMNS.categories.heading}
            links={FOOTER_COLUMNS.categories.links}
          />

          <div>
            <h3 className="text-[#F9FAFB] font-semibold mb-4">
              {FOOTER_COLUMNS.social.heading}
            </h3>
            <div className="flex gap-4">
              {FOOTER_COLUMNS.social.links.map(({ href, label, Icon }) => (
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
          <p className="text-[#9CA3AF] text-sm">{SITE.copyright}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
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
