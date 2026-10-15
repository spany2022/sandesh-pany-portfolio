import { caseStudies, getCaseStudy } from '../data/caseStudies';
import { products, getProduct } from '../data/products';
import { industries, getIndustry, getIndustryForCaseStudy } from '../data/industries';

export const SITE_URL = 'https://sandeshpany.com';
const SITE_NAME = 'Sandesh Pany';
const EMAIL = 'sandeshpany24@gmail.com';
const PHONE = import.meta.env.VITE_PHONE_NUMBER;

const url = (path) => `${SITE_URL}${path}`;

// ---------- Structured data (schema.org) ----------

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Bhubaneswar',
  addressRegion: 'Odisha',
  addressCountry: 'IN',
};

const areaServed = [
  { '@type': 'City', name: 'Bhubaneswar' },
  { '@type': 'State', name: 'Odisha' },
  { '@type': 'Country', name: 'India' },
];

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  jobTitle: 'AI Full-Stack Developer',
  url: SITE_URL,
  image: url('/og/home.jpg'),
  email: `mailto:${EMAIL}`,
  ...(PHONE && { telephone: PHONE }),
  address,
  knowsAbout: ['Web Design', 'Web Development', 'React', 'Next.js', 'Node.js', 'AI Automation', 'WhatsApp Automation', 'SEO'],
};

const business = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'Sandesh Pany — Web Design & AI Automation',
  description: 'Website design, web development and AI automation for local businesses in Bhubaneswar and across India.',
  url: SITE_URL,
  image: url('/og/home.jpg'),
  email: EMAIL,
  ...(PHONE && { telephone: PHONE }),
  address,
  areaServed,
  founder: { '@id': `${SITE_URL}/#person` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      ...industries.map((industry) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `Website design for ${industry.name.toLowerCase()}`, url: url(`/websites/${industry.slug}`) },
      })),
      ...products.map((product) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: product.name, url: url(`/ai-solutions/${product.slug}`) },
      })),
    ],
  },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#business` },
};

const breadcrumbs = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: url(item.path),
  })),
});

const faqPage = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});

const service = ({ name, description, path, serviceType }) => ({
  '@type': 'Service',
  name,
  description,
  serviceType,
  url: url(path),
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed,
});

const itemList = (items) => ({
  '@type': 'ItemList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: url(item.path) })),
});

// ---------- Page metadata ----------

const page = ({ title, description, path, image = '/og/home.jpg', type = 'website', schema = [], noindex = false }) => ({
  title,
  description,
  canonical: url(path),
  image: url(image),
  type,
  noindex,
  jsonLd: { '@context': 'https://schema.org', '@graph': [website, ...schema] },
});

const notFound = () =>
  page({
    title: 'Page not found | Sandesh Pany',
    description: "This page doesn't exist. Explore website design and AI automation work by Sandesh Pany.",
    path: '/404',
    noindex: true,
  });

export const getPageMeta = (pathname) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  if (path === '/') {
    return page({
      title: 'Sandesh Pany — Web Developer in Bhubaneswar | AI Automation',
      description: 'Freelance web designer and AI full-stack developer in Bhubaneswar, Odisha. Fast, modern websites and AI automation for local businesses across India.',
      path,
      schema: [person, business],
    });
  }

  if (path === '/work') {
    return page({
      title: 'Work & Case Studies | Sandesh Pany',
      description: 'Live websites designed and built for cafes, real estate agencies, interior designers, jewellery stores, boutiques, dental clinics and salons.',
      path,
      schema: [
        { '@type': 'CollectionPage', name: 'Work & Case Studies', url: url(path) },
        itemList(caseStudies.map((s) => ({ name: s.name, path: `/work/${s.slug}` }))),
        breadcrumbs([{ name: 'Work', path }]),
      ],
    });
  }

  if (path.startsWith('/work/')) {
    const study = getCaseStudy(path.slice('/work/'.length));
    if (!study) return notFound();
    const industry = getIndustryForCaseStudy(study.slug);
    return page({
      title: `${study.name} — ${study.industry} Website Case Study | Sandesh Pany`,
      description: study.summary,
      path,
      image: `/og/work-${study.slug}.jpg`,
      type: 'article',
      schema: [
        {
          '@type': 'CreativeWork',
          name: `${study.name} — ${study.industry} website`,
          description: study.summary,
          url: url(path),
          image: url(`/og/work-${study.slug}.jpg`),
          creator: { '@id': `${SITE_URL}/#person` },
          genre: 'Website design',
          sameAs: study.url,
          ...(industry && { about: { '@type': 'Thing', name: industry.name } }),
        },
        breadcrumbs([{ name: 'Work', path: '/work' }, { name: study.name, path }]),
      ],
    });
  }

  if (path === '/websites') {
    return page({
      title: 'Website Design in Bhubaneswar for Local Businesses | Sandesh Pany',
      description: 'Website design and development in Bhubaneswar for cafes, clinics, salons, stores, real estate and interior designers — serving businesses across India.',
      path,
      image: '/og/websites.jpg',
      schema: [
        service({ name: 'Website design for local businesses', description: 'Website design and development for local businesses in Bhubaneswar and across India.', path, serviceType: 'Website design' }),
        itemList(industries.map((i) => ({ name: `Website design for ${i.name.toLowerCase()}`, path: `/websites/${i.slug}` }))),
        breadcrumbs([{ name: 'Websites', path }]),
      ],
    });
  }

  if (path.startsWith('/websites/')) {
    const industry = getIndustry(path.slice('/websites/'.length));
    if (!industry) return notFound();
    return page({
      title: `${industry.seoTitle} | Sandesh Pany`,
      description: industry.seoDescription,
      path,
      image: `/og/websites-${industry.slug}.jpg`,
      schema: [
        service({ name: `Website design for ${industry.name.toLowerCase()}`, description: industry.seoDescription, path, serviceType: 'Website design' }),
        faqPage(industry.faqs),
        breadcrumbs([{ name: 'Websites', path: '/websites' }, { name: industry.name, path }]),
      ],
    });
  }

  if (path === '/ai-solutions') {
    return page({
      title: 'AI Automation for Local Businesses in India | Sandesh Pany',
      description: 'AI tools that help local businesses get paid faster, win back leads on WhatsApp, earn more Google reviews and reduce no-shows. Built in Bhubaneswar.',
      path,
      image: '/og/ai-solutions.jpg',
      schema: [
        service({ name: 'AI automation for local businesses', description: 'AI automation tools for payments, WhatsApp leads, Google reviews and bookings.', path, serviceType: 'AI automation' }),
        itemList(products.map((p) => ({ name: p.name, path: `/ai-solutions/${p.slug}` }))),
        breadcrumbs([{ name: 'AI Solutions', path }]),
      ],
    });
  }

  if (path.startsWith('/ai-solutions/')) {
    const product = getProduct(path.slice('/ai-solutions/'.length));
    if (!product) return notFound();
    return page({
      title: `${product.seoTitle} | Sandesh Pany`,
      description: product.seoDescription,
      path,
      image: `/og/ai-${product.slug}.jpg`,
      schema: [
        service({ name: product.name, description: product.seoDescription, path, serviceType: 'AI automation' }),
        faqPage(product.faqs),
        breadcrumbs([{ name: 'AI Solutions', path: '/ai-solutions' }, { name: product.name, path }]),
      ],
    });
  }

  return notFound();
};

// Every indexable page, used for prerendering and the sitemap
export const getAllRoutes = () => [
  '/',
  '/work',
  ...caseStudies.map((s) => `/work/${s.slug}`),
  '/websites',
  ...industries.map((i) => `/websites/${i.slug}`),
  '/ai-solutions',
  ...products.map((p) => `/ai-solutions/${p.slug}`),
];

// ---------- <head> tags ----------

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Every tag carries data-seo so the client can swap them on navigation
export const renderHeadTags = (meta) => {
  const tags = [
    `<title data-seo>${escapeHtml(meta.title)}</title>`,
    `<meta data-seo name="description" content="${escapeHtml(meta.description)}" />`,
    meta.noindex
      ? `<meta data-seo name="robots" content="noindex, follow" />`
      : `<link data-seo rel="canonical" href="${meta.canonical}" />`,
    `<meta data-seo property="og:type" content="${meta.type}" />`,
    `<meta data-seo property="og:site_name" content="${SITE_NAME}" />`,
    `<meta data-seo property="og:locale" content="en_IN" />`,
    `<meta data-seo property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta data-seo property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo property="og:url" content="${meta.canonical}" />`,
    `<meta data-seo property="og:image" content="${meta.image}" />`,
    `<meta data-seo property="og:image:width" content="1200" />`,
    `<meta data-seo property="og:image:height" content="630" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta data-seo name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo name="twitter:image" content="${meta.image}" />`,
    `<script data-seo type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.join('\n    ');
};
