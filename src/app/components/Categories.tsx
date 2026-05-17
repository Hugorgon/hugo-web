import { CategoryCard } from './CategoryCard';
import { Container } from './Container';
import { HOME } from '../../data/home';
import { ROUTES } from '../../data/routes';

export function Categories() {
  return (
    <section className="bg-[#0A0A0B] py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            {HOME.categories.title}{' '}
            <span className="text-[#F59E0B]">{HOME.categories.titleHighlight}</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg max-w-2xl mx-auto">
            {HOME.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME.categories.items.map(({ slug, title, description, Icon, videoCount }) => (
            <CategoryCard
              key={slug}
              title={title}
              description={description}
              icon={<Icon size={24} />}
              videoCount={videoCount}
              to={`${ROUTES.videos}?category=${encodeURIComponent(slug)}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
