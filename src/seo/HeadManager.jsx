import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, renderHeadTags } from './meta';

// Keeps <title>, description, canonical, social tags and JSON-LD in sync with the
// current page. The prerendered HTML ships the same tags, so crawlers see them without JS.
const HeadManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    document.head.insertAdjacentHTML('beforeend', renderHeadTags(getPageMeta(pathname)));
  }, [pathname]);

  return null;
};

export default HeadManager;
