import { Link, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import FeatureRows from '../components/FeatureRows';
import StepGrid from '../components/StepGrid';
import FaqList from '../components/FaqList';
import CtaBanner from '../components/CtaBanner';
import ArrowIcon from '../components/ArrowIcon';
import SectionTitle from '../components/SectionTitle';
import { ProductName } from '../components/ProductCard';
import NotFound from './NotFound';
import { industries, getIndustry } from '../data/industries';
import { getCaseStudy } from '../data/caseStudies';
import { getProduct } from '../data/products';
import { websiteProcess } from '../data/process';
import { whatsappNumber, whatsappLink } from '../utils/whatsapp';

const IndustryPage = () => {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <NotFound />;

  const study = getCaseStudy(industry.caseStudySlug);
  const related = industry.relatedProducts.map(getProduct).filter(Boolean);
  const others = industries.filter((i) => i.slug !== industry.slug);
  const message = `Hi Sandesh, I'd like a website for my ${industry.singular}.`;

  return (
    <PageLayout>
      <Breadcrumbs items={[{ name: 'Websites', to: '/websites' }, { name: industry.name, to: `/websites/${industry.slug}` }]} />

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 md:mb-32">
        <div className="lg:col-span-7">
          <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-6">
            Website design · Bhubaneswar & across India
          </p>
          <h1 className="text-[12vw] md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-[0.92] uppercase">
            Websites for
            <span className="block font-light italic lowercase font-serif text-gray-300">{industry.name.toLowerCase()}</span>
          </h1>
        </div>
        <div className="lg:col-span-5 lg:pt-12 flex flex-col gap-5">
          {industry.intro.map((paragraph) => (
            <p key={paragraph} className="text-gray-300 text-base md:text-lg font-light leading-relaxed">{paragraph}</p>
          ))}
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {whatsappNumber && (
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#ccff00] text-black text-sm font-medium hover:bg-[#b3e600] transition-colors inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Get a free consultation
              </a>
            )}
            {study && (
              <Link to={`/work/${study.slug}`} className="px-6 py-3 rounded-full border border-white/30 text-white text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2">
                See an example
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* What the website needs */}
      <section className="mb-24 md:mb-36">
        <SectionTitle>
          What your website
          <span className="block font-light italic text-gray-300 lowercase font-serif">needs</span>
        </SectionTitle>
        <FeatureRows features={industry.features} />
      </section>

      {/* Example */}
      {study && (
        <section className="mb-24 md:mb-36">
          <SectionTitle>
            Recent
            <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">work</span>
          </SectionTitle>
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Link to={`/work/${study.slug}`} className="lg:col-span-7 block overflow-hidden rounded-sm aspect-[16/10] bg-[#111]">
              <img src={study.image} alt={`${study.name} website homepage`} loading="lazy" width="1440" height="900" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <div className="lg:col-span-5">
              <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">{study.industry}</p>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[1.05] mb-3">{study.name}</h3>
              <p className="font-serif italic text-gray-300 text-lg md:text-xl mb-5">{study.tagline}</p>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-8">{study.summary}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to={`/work/${study.slug}`} className="px-6 py-2.5 rounded-full bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] transition-colors inline-flex items-center gap-2">
                  Read Case Study
                  <ArrowIcon />
                </Link>
                <a href={study.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2">
                  Live Site
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="mb-24 md:mb-36">
        <SectionTitle>
          How we
          <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">work together</span>
        </SectionTitle>
        <StepGrid steps={websiteProcess} />
      </section>

      {/* Related AI products */}
      {related.length > 0 && (
        <section className="mb-24 md:mb-36">
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-6">
            Add AI to your {industry.singular}
          </p>
          <div className="border-t border-white/20">
            {related.map((product) => (
              <Link key={product.slug} to={`/ai-solutions/${product.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 items-center py-6 md:py-8 border-b border-white/20">
                <span className="md:col-span-5 text-lg md:text-2xl font-black uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                  <ProductName name={product.name} />
                </span>
                <span className="md:col-span-6 text-gray-400 text-sm md:text-base font-light leading-relaxed">{product.tagline}</span>
                <ArrowIcon className="hidden md:block md:col-span-1 justify-self-end w-7 h-7 text-[#ccff00] transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mb-24 md:mb-32">
        <SectionTitle>
          Common
          <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">questions</span>
        </SectionTitle>
        <FaqList faqs={industry.faqs} />
      </section>

      <div className="mb-24 md:mb-32">
        <CtaBanner
          eyebrow={`Websites for ${industry.name.toLowerCase()}`}
          title={<>Let's build yours<span className="block font-light italic lowercase font-serif">next.</span></>}
          message={message}
        />
      </div>

      {/* Other industries */}
      <section>
        <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-6">Other industries</p>
        <div className="flex flex-wrap gap-3">
          {others.map((other) => (
            <Link key={other.slug} to={`/websites/${other.slug}`} className="text-sm text-gray-300 border border-white/15 rounded-full px-4 py-2 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors">
              {other.name}
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default IndustryPage;
