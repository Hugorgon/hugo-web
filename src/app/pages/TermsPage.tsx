import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';

/**
 * Stručné podmínky používání pro malý osobní obsahový web.
 * Lidská řeč, ne právnické šablony.
 */
export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow="Právní"
            title={
              <>
                Podmínky <span className="text-[#F59E0B]">používání</span>
              </>
            }
            subtitle="Co se smí, co se nesmí a kde leží naše hranice."
          />

          <article className="max-w-3xl mx-auto">
            <p className="text-[#D1D5DB] text-lg leading-relaxed mb-6">
              Vítejte na Hugo Stories. Používáním této stránky souhlasíte s následujícími jednoduchými pravidly.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Obsah a autorská práva
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Veškerý obsah na této stránce — texty, videa, obrázky, design — je chráněn autorským právem. Obsah můžete sdílet odkazem nebo citovat s uvedením zdroje. Kopírování, šíření nebo komerční využití bez výslovného souhlasu není povoleno.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Použití stránky
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Stránka je určena k osobnímu, nekomerčnímu prohlížení. Pokus o automatizované stahování obsahu, narušování provozu nebo zneužití stránky není povolen.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Odpovědnost
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Snažíme se obsah uvádět přesně a srozumitelně, ale stránka je poskytovaná „tak, jak je". Neneseme odpovědnost za případné chyby, nepřesnosti nebo dočasnou nedostupnost.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Externí odkazy
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Stránka může odkazovat na externí weby (sociální sítě, videoplatformy). Za jejich obsah ani dostupnost neneseme odpovědnost.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Změny podmínek
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Tyto podmínky mohou být v budoucnu upraveny. Pokračováním v používání stránky vyjadřujete souhlas s aktuální verzí.
            </p>

            <h2 className="text-2xl font-semibold text-[#F9FAFB] mt-12 mb-4">
              Kontakt
            </h2>
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              S jakýmkoli dotazem ohledně podmínek nebo obsahu se obraťte na e-mail uvedený na stránce Kontakt.
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
