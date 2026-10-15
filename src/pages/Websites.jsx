import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import StepGrid from '../components/StepGrid';
import CtaBanner from '../components/CtaBanner';
import ArrowIcon from '../components/ArrowIcon';
import { industries } from '../data/industries';
import { getCaseStudy } from '../data/caseStudies';
import { websiteProcess } from '../data/process';

const Websites = () => (
  <PageLayout>
    <Breadcrumbs items={[{ name: 'Websites', to: '/websites' }]} />

    {/* Header */}
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 md:mb-24">
      <h1 className="text-[12vw] md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-[0.92] uppercase">
        Website design
        <span className="block font-light italic lowercase font-serif text-gray-300">for local businesses</span>
      </h1>
      <div className="lg:w-4/12 lg:pb-4">
        <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
          Bhubaneswar · Odisha · All India
        </p>
        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
          I'm a web designer and developer based in Bhubaneswar, building fast, modern websites for local businesses across India. Pick your industry to see what your website needs — and a live example I've built.
        </p>
      </div>
    </div>

    {/* Industries */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-20 mb-24 md:mb-36">
      {industries.map((industry, idx) => {
        const study = getCaseStudy(industry.caseStudySlug);
        return (
          <article key={industry.slug} className="group flex flex-col">
            <Link to={`/websites/${industry.slug}`} className="block overflow-hidden relative aspect-[16/10] bg-[#111] rounded-sm mb-6">
              {study && (
                <img src={study.image} alt={`Website designed for a ${industry.singular}`} loading={idx < 2 ? 'eager' : 'lazy'} width="1440" height="900" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              )}
            </Link>
            <span className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
              {String(idx + 1).padStart(2, '0')} — Website design
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-[1.1] mb-3">
              <Link to={`/websites/${industry.slug}`} className="hover:text-[#ccff00] transition-colors">
                Websites for {industry.name}
              </Link>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-6">{industry.seoDescription}</p>
            <Link to={`/websites/${industry.slug}`} className="mt-auto self-start inline-flex items-center gap-2 text-sm font-medium text-[#ccff00] border-b border-[#ccff00]/40 pb-1 hover:border-[#ccff00] transition-colors">
              Explore
              <ArrowIcon className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </article>
        );
      })}
    </section>

    {/* Process */}
    <section className="mb-24 md:mb-32">
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-[0.95] uppercase mb-10 md:mb-14">
        How we
        <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">work together</span>
      </h2>
      <StepGrid steps={websiteProcess} />
    </section>

    <CtaBanner
      eyebrow="Free consultation"
      title={<>Need a website<span className="block font-light italic lowercase font-serif">for your business?</span></>}
      message="Hi Sandesh, I'd like a website for my business."
    />
  </PageLayout>
);

export default Websites;
