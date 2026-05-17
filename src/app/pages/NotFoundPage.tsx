import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LinkButton } from '../components/LinkButton';
import { ROUTES } from '../../data/routes';

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
            Vypadá to, že jste zabloudili
          </h1>
          <p className="text-[#D1D5DB] mb-8 leading-relaxed">
            Ani já, pes s vyhraněnými názory na navigaci, tuhle stránku nenajdu. Vraťme vás zpět tam, kde se vyznáte.
          </p>
          <LinkButton to={ROUTES.home}>Zpět na domovskou stránku</LinkButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
