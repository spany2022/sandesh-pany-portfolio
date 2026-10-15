import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import { products } from '../data/products';
import ArrowIcon from './ArrowIcon';
import ProductCard from './ProductCard';

// `featured` is the project's position on the home page
const featuredWork = caseStudies
  .filter((study) => study.featured)
  .sort((a, b) => a.featured - b.featured);

const Project = () => {
  return (
    <section id="project" className="bg-[#050505] w-full text-white pt-10 md:pt-20 pb-24 px-6 md:px-16">

      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-12 lg:gap-0 mb-20 lg:mb-32">

        {/* Left Giant Title */}
        <div className="w-full lg:w-7/12 overflow-visible">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.9] uppercase flex items-center gap-3 whitespace-nowrap">
            Selected
            <span className="font-light italic text-gray-300 lowercase font-serif pr-4 pt-2 md:pt-4">work</span>
          </h2>
        </div>

        {/* Right Description */}
        <div className="w-full lg:w-4/12 flex flex-col items-start lg:mt-4">
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-8">
            Websites I've designed and built for cafes, clinics, studios and stores — each one live and ready to explore. Every project starts with the business goal, then the design.
          </p>
          <Link to="/work" className="px-6 py-2.5 rounded-full border border-[#ccff00] bg-[#ccff00] text-black font-medium text-xs md:text-sm hover:bg-[#b3e600] hover:border-[#b3e600] transition-colors flex items-center gap-2">
            View All {caseStudies.length} Projects
            <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* Projects List - Alternating Layout */}
      <div className="flex flex-col gap-24 lg:gap-40 w-full">
        {featuredWork.map((study, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={study.slug} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-12 lg:gap-16 w-full group`}>

              {/* Image Side */}
              <Link to={`/work/${study.slug}`} className="w-full lg:w-6/12 overflow-hidden relative aspect-[16/10] bg-[#111] rounded-sm">
                <img
                  src={study.image}
                  alt={`${study.name} website homepage`}
                  width="1440"
                  height="900"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </Link>

              {/* Text Side */}
              <div className="w-full lg:w-5/12 flex flex-col items-start">
                <span className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
                  0{idx + 1} — {study.industry}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[1.1] uppercase mb-3">
                  {study.name}
                </h3>
                <p className="font-serif italic text-gray-300 text-lg md:text-xl mb-6">
                  {study.tagline}
                </p>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10">
                  {study.summary}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <Link to={`/work/${study.slug}`} className="px-6 py-2.5 rounded-full border border-[#ccff00] bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] hover:border-[#b3e600] transition-colors inline-flex items-center gap-2">
                    Case Study
                    <ArrowIcon />
                  </Link>
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2">
                    Live Site
                    <ArrowIcon />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Currently Building */}
      <div className="mt-32 lg:mt-48">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
              AI for local businesses
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-[0.9] uppercase">
              Currently
              <span className="font-light italic text-gray-300 lowercase font-serif pl-3">building</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md">
            AI systems that help local businesses get paid faster, win back leads, earn more reviews and cut no-shows. Want one for your business? Tap "I'm interested" to chat with me on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/20">
          {products.map((product, idx) => (
            <ProductCard key={product.slug} product={product} index={idx} className={idx % 2 === 0 ? 'md:pr-10 md:border-r' : 'md:pl-10'} />
          ))}
        </div>

        <Link to="/ai-solutions" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#ccff00] border-b border-[#ccff00]/40 pb-1 hover:border-[#ccff00] transition-colors">
          Explore all AI solutions
          <ArrowIcon />
        </Link>
      </div>

    </section>
  );
};

export default Project;
