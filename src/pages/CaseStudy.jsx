import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArrowIcon from '../components/ArrowIcon';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';
import { caseStudies } from '../data/caseStudies';
import { getIndustryForCaseStudy } from '../data/industries';

const CaseStudy = () => {
  const { slug } = useParams();
  const index = caseStudies.findIndex((study) => study.slug === slug);
  const study = caseStudies[index];

  if (!study) return <NotFound />;

  const industry = getIndustryForCaseStudy(study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const hostname = new URL(study.url).hostname;
  const position = `${String(index + 1).padStart(2, '0')} / ${String(caseStudies.length).padStart(2, '0')}`;

  const details = [
    { label: 'Industry', value: study.industry },
    study.location && { label: 'Location', value: study.location },
    { label: 'Built with', value: study.stack.join(' · ') },
  ].filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="bg-[#050505] text-white pt-32 md:pt-40 pb-24 px-6 md:px-16">

        <Breadcrumbs items={[{ name: 'Work', to: '/work' }, { name: study.name, to: `/work/${study.slug}` }]} />

        {/* Title */}
        <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-6">
          {position} — Case Study
        </p>
        <h1 className="text-[13vw] md:text-8xl lg:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.9] uppercase break-words mb-6">
          {study.name}
        </h1>
        <p className="font-serif italic text-gray-300 text-2xl md:text-4xl mb-14 md:mb-20">
          {study.tagline}
        </p>

        {/* Project details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/20 mb-14 md:mb-20">
          {details.map((item) => (
            <div key={item.label} className="py-6 border-b border-white/20 lg:border-b-0 lg:pr-8">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{item.label}</p>
              <p className="text-white text-base md:text-lg">{item.value}</p>
            </div>
          ))}
          <div className="py-6 flex items-center lg:justify-end">
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-[#ccff00] bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] hover:border-[#b3e600] transition-colors inline-flex items-center gap-2">
              Visit Live Site
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Screenshot in a browser frame */}
        <a href={study.url} target="_blank" rel="noopener noreferrer" className="group block rounded-lg overflow-hidden border border-white/10 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,0.6)] mb-24 md:mb-36">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0c0c0c]">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
            <span className="ml-3 flex-1 min-w-0 truncate text-gray-500 text-xs tracking-wide">{hostname}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-500 text-xs group-hover:text-[#ccff00] transition-colors">
              Open
              <ArrowIcon className="w-2.5 h-2.5" />
            </span>
          </div>
          <div className="overflow-hidden aspect-[16/10]">
            <img
              src={study.image}
              alt={`${study.name} website homepage`}
              width="1440"
              height="900"
              fetchPriority="high"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </a>

        {/* Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-20 md:mb-32">
          <p className="lg:col-span-3 text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase pt-2">
            Overview
          </p>
          <p className="lg:col-span-9 text-2xl md:text-4xl font-light leading-snug text-gray-200">
            {study.summary}
          </p>
        </section>

        {/* Brief & approach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 mb-24 md:mb-36">
          {[
            { id: '01', title: 'The brief', text: study.brief },
            { id: '02', title: 'The approach', text: study.approach },
          ].map((block) => (
            <div key={block.id} className="border-t border-white/20 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[#ccff00] text-sm font-bold">{block.id}</span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{block.title}</h2>
              </div>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">{block.text}</p>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="mb-24 md:mb-36">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-[0.95] uppercase mb-12 md:mb-16">
            What's on
            <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">the site</span>
          </h2>
          <div className="-mx-6 md:-mx-16 border-t border-white/20">
            {study.features.map((feature, idx) => (
              <div key={feature.title} className="group/row border-b border-white/20 px-6 md:px-16 py-6 md:py-8 grid grid-cols-[2rem_1fr] md:grid-cols-[3.5rem_1fr] lg:grid-cols-[3.5rem_5fr_6fr] gap-x-6 md:gap-x-16 gap-y-2 items-baseline transition-colors duration-300 hover:bg-[#ccff00]">
                <span className="text-lg md:text-3xl font-medium text-white group-hover/row:text-black transition-colors duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm md:text-xl lg:text-2xl font-black uppercase tracking-wide text-white group-hover/row:text-black transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="col-start-2 lg:col-start-3 text-gray-400 text-sm md:text-base font-light leading-relaxed group-hover/row:text-black/80 transition-colors duration-300">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Industry page link */}
        {industry && (
          <Link to={`/websites/${industry.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/15 rounded-2xl px-6 py-6 md:px-10 md:py-8 mb-10 md:mb-14 hover:border-[#ccff00]/60 transition-colors">
            <span>
              <span className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Own a {industry.singular}?</span>
              <span className="block text-xl md:text-3xl font-black uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                Website design for {industry.name.toLowerCase()}
              </span>
            </span>
            <ArrowIcon className="w-7 h-7 md:w-10 md:h-10 shrink-0 text-[#ccff00] transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        )}

        {/* Call to action */}
        <section className="bg-[#ccff00] text-black rounded-sm px-6 py-12 md:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24 md:mb-32">
          <div>
            <p className="text-xs md:text-sm font-bold tracking-widest uppercase mb-4 text-black/70">
              Like what you see?
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95]">
              Let's build yours
              <span className="block font-light italic lowercase font-serif">next.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/#contact" className="px-6 py-3 rounded-full bg-black text-[#ccff00] text-xs md:text-sm font-medium border border-black hover:bg-transparent hover:text-black transition-colors inline-flex items-center gap-2">
              Start a Project
              <ArrowIcon />
            </Link>
            <a href={study.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-black/40 text-black text-xs md:text-sm hover:bg-black hover:text-[#ccff00] transition-colors inline-flex items-center gap-2">
              Visit Live Site
              <ArrowIcon />
            </a>
          </div>
        </section>

        {/* Next project */}
        <Link to={`/work/${next.slug}`} className="group block border-t border-white/20 pt-10">
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-4">Next project — {next.industry}</p>
          <div className="flex items-center justify-between gap-6">
            <span className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none group-hover:text-[#ccff00] transition-colors">
              {next.name}
            </span>
            <ArrowIcon className="w-8 h-8 md:w-14 md:h-14 shrink-0 text-[#ccff00] transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudy;
