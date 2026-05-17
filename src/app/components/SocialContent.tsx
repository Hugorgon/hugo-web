import { SocialCard } from './SocialCard';
import { Container } from './Container';
import { HOME } from '../../data/home';

export function SocialContent() {
  return (
    <section className="bg-[#111214] py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            {HOME.socialContent.title}{' '}
            <span className="text-[#F59E0B]">{HOME.socialContent.titleHighlight}</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg max-w-2xl mx-auto">
            {HOME.socialContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME.socialContent.platforms.map(({ platform, Icon, followers, description, handle }) => (
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
