import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';
import { CONTACT } from '../../data/contact';
import { PAGES } from '../../data/pages';
import {
  fetchContactPage,
  LOCAL_CONTACT_PAGE,
  type ContactMethod,
  type ContactPageData,
} from '../../lib/queries/contactPage';

/**
 * Statická kontaktní stránka.
 *
 * Sjednocený seznam kontaktních metod přichází ze Sanity `contactPage`
 * singletonu s lokálním fallbackem. Pravidla renderování:
 *  - `url` vyplněná → external link (target="_blank", rel="noopener noreferrer")
 *  - `url` chybí → plain block bez anchoru (anti-spam pattern pro e-mail —
 *    žádný `mailto:`, žádný anchor, který by scrapeři dokázali odhalit)
 *  - `notice` vyplněná → drobný šedý řádek pod displayText (vysvětlivka)
 *
 * Card heading / lead / closing a page header copy zůstávají v lokálních
 * datech — Sanity zatím spravuje pouze metody.
 */
export function ContactPage() {
  const [data, setData] = useState<ContactPageData>(LOCAL_CONTACT_PAGE);

  useEffect(() => {
    let cancelled = false;
    fetchContactPage().then((next) => {
      if (!cancelled && next) setData(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow={PAGES.contact.header.eyebrow}
            title={
              <>
                {PAGES.contact.header.titleLead}{' '}
                <span className="text-[#F59E0B]">
                  {PAGES.contact.header.titleHighlight}
                </span>
              </>
            }
            subtitle={PAGES.contact.header.subtitle}
          />

          <div className="max-w-2xl mx-auto">
            <div className="bg-[#161618] border border-[#2A2B31] rounded-lg p-8 md:p-10">
              <h2 className="text-2xl font-semibold text-[#F9FAFB] mb-2">
                {CONTACT.card.heading}
              </h2>
              <p className="text-[#9CA3AF] text-sm mb-8">
                {CONTACT.card.lead}
              </p>

              <div className="space-y-6">
                {data.methods.map((method) => (
                  <ContactMethodRow key={method.label} method={method} />
                ))}
              </div>
            </div>

            <p className="text-[#9CA3AF] text-sm text-center mt-8">
              {CONTACT.closing}
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Jedna karta kontaktní metody.
 * Když má `url`, vykreslí se jako external anchor — stejné Tailwind třídy
 * jako u sociálních profilů ve staré verzi.
 * Když `url` chybí, vykreslí se jako neklikatelný `<div>` (anti-spam pro
 * e-mail) — bez `hover:bg`, bez `transition`, aby uživatel neměl falešné
 * affordance kliku.
 *
 * Inner markup (ikona + label + displayText + optional notice) je v obou
 * případech identický.
 */
function ContactMethodRow({ method }: { method: ContactMethod }) {
  const { Icon, label, displayText, url, notice } = method;

  const Inner = (
    <>
      <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="text-[#F59E0B]" size={22} />
      </div>
      <div className="min-w-0">
        <div className="text-[#9CA3AF] text-sm mb-0.5">{label}</div>
        <div className="text-[#F9FAFB] font-medium truncate select-text">
          {displayText}
        </div>
        {notice && (
          <div className="text-[#9CA3AF] text-xs mt-1">{notice}</div>
        )}
      </div>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 -mx-4 rounded-lg hover:bg-[#1A1A1C] transition-colors duration-200 ease-soft"
      >
        {Inner}
      </a>
    );
  }

  // Anti-spam: žádný anchor, žádný mailto:, žádný hover affordance.
  return (
    <div className="flex items-center gap-4 p-4 -mx-4">{Inner}</div>
  );
}
