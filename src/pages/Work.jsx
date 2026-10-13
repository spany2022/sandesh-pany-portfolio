import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { caseStudies } from '../data/caseStudies';
import ArrowIcon from '../components/ArrowIcon';

const Work = () => {
  useEffect(() => {
    document.title = 'Work — Sandesh Pany';
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-[#050505] text-white min-h-screen pt-32 md:pt-40 pb-24 px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 md:mb-24">
          <h1 className="text-[18vw] md:text-[9rem] lg:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-none uppercase">
            Work
          </h1>
          <div className="lg:w-4/12 lg:pb-6">
            <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
              {caseStudies.length} live projects
            </p>
            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
              Websites for cafes, clinics, salons, studios, stores and agencies. Open a case study to see the brief and what was built, or visit the live site.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-24">
          {caseStudies.map((study, idx) => (
            <article key={study.slug} className="group flex flex-col">
              <Link to={`/work/${study.slug}`} className="block overflow-hidden relative aspect-[16/10] bg-[#111] rounded-sm mb-6">
                <img
                  src={study.image}
                  alt={`${study.name} website homepage`}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </Link>

              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase">
                  {String(idx + 1).padStart(2, '0')} — {study.industry}
                </span>
                {study.location && (
                  <span className="hidden sm:block text-gray-500 text-xs tracking-wide truncate">{study.location.split(' · ')[0]}</span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-[1.1] mb-2">
                <Link to={`/work/${study.slug}`} className="hover:text-[#ccff00] transition-colors">
                  {study.name}
                </Link>
              </h2>
              <p className="font-serif italic text-gray-300 text-base md:text-lg mb-6">
                {study.tagline}
              </p>

              <div className="flex items-center gap-4 flex-wrap mt-auto">
                <Link to={`/work/${study.slug}`} className="px-6 py-2.5 rounded-full border border-[#ccff00] bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] hover:border-[#b3e600] transition-colors inline-flex items-center gap-2">
                  Case Study
                  <ArrowIcon />
                </Link>
                <a href={study.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2">
                  Live Site
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Work;
