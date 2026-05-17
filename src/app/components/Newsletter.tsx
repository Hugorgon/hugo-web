import { Mail, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';
import { HOME } from '../../data/home';

export function Newsletter() {
  return (
    <section id="newsletter" className="bg-[#0A0A0B] py-24">
      <Container>
        <div className="bg-gradient-to-br from-[#F59E0B]/10 to-transparent border border-[#F59E0B]/20 rounded-2xl p-12 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F59E0B]/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="text-[#F59E0B]" size={32} />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
              {HOME.newsletter.heading}
            </h2>
            <p className="text-[#D1D5DB] text-lg mb-8 leading-relaxed">
              {HOME.newsletter.lead}
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
              <input
                type="email"
                placeholder={HOME.newsletter.inputPlaceholder}
                aria-label={HOME.newsletter.inputAriaLabel}
                className="flex-1 px-6 py-4 bg-[#161618] border border-[#2A2B31] rounded-lg text-[#F9FAFB] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus-visible:ring-2 focus-visible:ring-[#F59E0B]/40 transition-colors duration-200 ease-soft"
              />
              <Button className="whitespace-nowrap">
                {HOME.newsletter.submitLabel}
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#9CA3AF]">
              {HOME.newsletter.checks.map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#10B981]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
