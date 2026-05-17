import { Mail } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';
import { CONTACT } from '../../data/contact';
import { PAGES } from '../../data/pages';

/**
 * Statická kontaktní stránka.
 * Sociální odkazy vedou na reálné profily; e-mail je záměrně zapsaný
 * v obfuskované podobě a NENÍ klikatelný — žádný mailto:, žádný anchor.
 * Brání spamovým robotům, kteří scrapují HTML.
 */
export function ContactPage() {
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
                {CONTACT.socials.map(({ Icon, label, handle, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 -mx-4 rounded-lg hover:bg-[#1A1A1C] transition-colors duration-200 ease-soft"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-[#F59E0B]" size={22} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[#9CA3AF] text-sm mb-0.5">{label}</div>
                      <div className="text-[#F9FAFB] font-medium truncate">
                        {handle}
                      </div>
                    </div>
                  </a>
                ))}

                {/* Záměrně NEKLIKATELNÉ a NEOBSAHUJE mailto: */}
                <div className="flex items-center gap-4 p-4 -mx-4">
                  <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#F59E0B]" size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#9CA3AF] text-sm mb-0.5">
                      {CONTACT.email.label}
                    </div>
                    <div className="text-[#F9FAFB] font-medium select-text">
                      {CONTACT.email.obfuscated}
                    </div>
                    <div className="text-[#9CA3AF] text-xs mt-1">
                      {CONTACT.email.notice}
                    </div>
                  </div>
                </div>
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
