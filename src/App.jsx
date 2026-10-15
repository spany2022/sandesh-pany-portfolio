import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Websites from './pages/Websites';
import IndustryPage from './pages/IndustryPage';
import AiSolutions from './pages/AiSolutions';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
import HeadManager from './seo/HeadManager';
import { scrollToHash } from './utils/scroll';

// Scroll to the top on page change, or to the #section a link points at
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash && scrollToHash(hash)) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key]);

  return null;
}

function App() {
  return (
    <>
      <ScrollManager />
      <HeadManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/websites/:slug" element={<IndustryPage />} />
        <Route path="/ai-solutions" element={<AiSolutions />} />
        <Route path="/ai-solutions/:slug" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
