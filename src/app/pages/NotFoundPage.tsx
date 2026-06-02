import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LinkButton } from '../components/LinkButton';
import { ROUTES } from '../../data/routes';

/**
 * 404 Not Found.
 * Catch-all route v `App.tsx` (path="*") sem směruje všechno, co neodpovídá
 * žádné existující stránce. Drží stejnou kostru jako ostatní stránky
 * (Navbar + main + Footer) a stejný design system — žádné nové barvy,
 * žádný nový typografický rytmus.
 *
 * CTAs: primární vede zpět na homepage, sekundární na video archiv —
 * dva nejpravděpodobnější cíle, když uživatel skončí na 404.
 */
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-24">
        <div className="text-center max-w-md">
          <div className="text-[#F59E0B] text-8xl font-bold mb-6 leading-none">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-4">
            Tohle jsem taky nenašel.
          </h1>
          <p className="text-[#D1D5DB] mb-8 leading-relaxed">
            A že hledám dobře. Asi sis spletl stopu — pojď, vrátíme se někam,
            kde to voní známě.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton to={ROUTES.home}>Zpět na domovskou stránku</LinkButton>
            <LinkButton variant="secondary" to={ROUTES.videos}>
              Prozkoumat archiv
            </LinkButton>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
