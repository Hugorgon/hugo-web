import { Fragment } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import CountUp from 'react-countup';
import { Button } from './Button';
import { Container } from './Container';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HOME } from '../../data/home';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1578239825313-ac1f5f550a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Hugo, bostonský teriér"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-[#0A0A0B]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/60 to-transparent" />
      </div>

      <Container className="relative z-10 py-32">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full mb-6">
            <span className="text-[#F59E0B] text-sm font-medium">{HOME.hero.eyebrow}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            {HOME.hero.title}{' '}
            <span className="text-[#F59E0B]">{HOME.hero.titleHighlight}</span>
          </h1>

          <p className="text-xl text-[#D1D5DB] mb-8 leading-relaxed max-w-2xl">
            {HOME.hero.bio}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button className="gap-2 flex items-center">
              <Play size={20} className="fill-[#0A0A0B]" />
              {HOME.hero.primaryCta}
            </Button>
            <Button variant="secondary">
              {HOME.hero.secondaryCta}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-6 sm:gap-8 text-sm">
            {HOME.hero.stats.map((stat, index) => (
              <Fragment key={stat.label}>
                <div>
                  <div className="text-5xl font-bold text-[#F9FAFB] mb-2 tabular-nums">
                    <CountUp start={0} end={stat.end} duration={4.5} delay={stat.delay} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#D1D5DB]">{stat.label}</div>
                  <div className="text-[#9CA3AF] text-xs mt-1">{stat.subtext}</div>
                </div>
                {index < HOME.hero.stats.length - 1 && (
                  <div className="hidden sm:block w-px h-20 bg-[#2A2B31]" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-[#F59E0B]" size={32} />
      </div>
    </section>
  );
}
