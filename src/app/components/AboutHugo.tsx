import { LinkButton } from './LinkButton';
import { Container } from './Container';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ABOUT } from '../../data/about';

export function AboutHugo() {
  return (
    <section id="about" className="bg-[#111214] py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={ABOUT.portrait.imageUrl}
                alt={ABOUT.portrait.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#F59E0B] rounded-2xl p-6 shadow-2xl">
              <div className="text-[#0A0A0B] text-4xl font-bold mb-1">{ABOUT.badge.number}</div>
              <div className="text-[#0A0A0B] text-sm font-medium">{ABOUT.badge.label}</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6">
              {ABOUT.homeSection.title}{' '}
              <span className="text-[#F59E0B]">{ABOUT.homeSection.titleHighlight}</span>
            </h2>

            {ABOUT.bioParagraphs.map((paragraph, index) => {
              const isLast = index === ABOUT.bioParagraphs.length - 1;
              return (
                <p
                  key={index}
                  className={`text-[#D1D5DB] text-lg leading-relaxed ${isLast ? 'mb-8' : 'mb-6'}`}
                >
                  {paragraph}
                </p>
              );
            })}

            <div className="grid grid-cols-2 gap-6 mb-8">
              {ABOUT.features.map(({ Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-[#F59E0B]" size={20} />
                  </div>
                  <div>
                    <div className="text-[#F9FAFB] font-semibold mb-1">{title}</div>
                    <div className="text-[#9CA3AF] text-sm">{description}</div>
                  </div>
                </div>
              ))}
            </div>

            <LinkButton to={ABOUT.homeSection.ctaTo} className="gap-2">
              {ABOUT.homeSection.ctaLabel}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
