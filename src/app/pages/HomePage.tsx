import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturedVideos } from '../components/FeaturedVideos';
import { Categories } from '../components/Categories';
import { AboutHugo } from '../components/AboutHugo';
import { StoriesGrid } from '../components/StoriesGrid';
import { SocialContent } from '../components/SocialContent';
// Newsletter section is intentionally not rendered on the public site right
// now. The component, its CMS field, and the `/#newsletter` anchor route
// constant are kept in code so the section can be re-enabled by restoring
// this import and the <Newsletter /> render below in a single commit.
// import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';

/**
 * The original homepage layout.
 * Sections render in document order with no scroll-reveal layer — every
 * visual decision lives inside its own section component.
 */
export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <HeroSection />
      <FeaturedVideos />
      <Categories />
      <AboutHugo />
      <StoriesGrid />
      <SocialContent />
      {/* <Newsletter /> — intentionally hidden; see import comment above. */}
      <Footer />
    </div>
  );
}
