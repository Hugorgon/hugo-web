import { BrowserRouter, Route, Routes } from 'react-router';
import { ScrollToHash } from './components/ScrollToHash';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { VideoDetailPage } from './pages/VideoDetailPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ROUTES } from '../data/routes';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.videos} element={<VideosPage />} />
        <Route path={ROUTES.videoDetailPattern} element={<VideoDetailPage />} />
        <Route path={ROUTES.stories} element={<StoriesPage />} />
        <Route path={ROUTES.storyDetailPattern} element={<StoryDetailPage />} />
        <Route path={ROUTES.privacy} element={<PrivacyPage />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.contact} element={<ContactPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.gallery} element={<GalleryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
