import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';

/**
 * Stručné zásady ochrany soukromí pro malý osobní obsahový web.
 * Žádný právní formalismus — pravidla čitelná pro člověka, který
 * sem zabloudil z patičky.
 */
export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow="Právní"
            title={
              <>
                Zásady ochrany <span className="text-[#F59E0B]">soukromí</span>
              </>
            }
            subtitle="Co tahle stránka ví, co neví a co s tím můžete dělat."
          />

          <article className="max-w-3xl mx-auto">
            <p className="text-[#D1D5DB] text-lg leading-relaxed mb-6">
              Tahle stránka je osobní projekt provozovaný v dobré víře. Snažíme se shromažďovat co nejméně údajů. Tady je v kostce, co byste měli vědět.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Co stránka shromažďuje
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Stránka aktuálně nepoužívá sledovací nástroje třetích stran. Pokud v budoucnu nasadíme analytiku, bude to výhradně v anonymizované podobě — bez ukládání IP adres, identifikátorů zařízení ani osobních údajů.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Cookies
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Stránka v současné podobě nepoužívá funkční ani marketingové cookies. Pokud se to změní, doplníme detaily níže a před uložením vás požádáme o souhlas.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Newsletter
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Pokud se přihlásíte k odběru newsletteru, vaši e-mailovou adresu používáme výhradně k zasílání obsahu, ke kterému jste se přihlásili. Z odběru se můžete kdykoli odhlásit odkazem na konci každého e-mailu nebo nás můžete kontaktovat napřímo.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Vaše práva
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Máte právo požádat o přístup k údajům, jejich opravu nebo smazání. Stačí napsat na e-mail uvedený na stránce Kontakt — vyřídíme to v rozumné lhůtě.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Změny zásad
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Tyto zásady mohou být v budoucnu aktualizovány. Datum poslední úpravy najdete dole na této stránce.
            </p>

            <p className="text-[#9CA3AF] text-sm mt-16 pt-8 border-t border-[#2A2B31]">
              Naposledy aktualizováno: 13. května 2026
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
