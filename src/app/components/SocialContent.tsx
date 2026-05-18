import { useEffect, useState } from 'react';
import { SocialCard } from './SocialCard';
import { Container } from './Container';
import { HOME } from '../../data/home';
import {
  fetchHomePage,
  LOCAL_HOME,
  type HomePageData,
} from '../../lib/queries/homePage';

export function SocialContent() {
  // Initial state z local fallbacku — Sanity přepíše SECTION COPY (title +
  // titleHighlight + subtitle), platforms[] zatím zůstávají v local datech
  // (přijdou s `socialPlatform` collection v další phase).
  const [home, setHome] = useState<HomePageData>(LOCAL_HOME);

  useEffect(() => {
    let cancelled = false;
    fetchHomePage().then((data) => {
      if (!cancelled && data) setHome(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const section = home.socialContent;
  const platforms = HOME.socialContent.platforms;

  return (
    <section className="bg-[#111214] py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            {section.title}{' '}
            <span className="text-[#F59E0B]">{section.titleHighlight}</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg max-w-2xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(({ platform, Icon, followers, description, handle }) => (
            <SocialCard
              key={platform}
              platform={platform}
              icon={<Icon size={24} />}
              followers={followers}
              description={description}
              handle={handle}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
