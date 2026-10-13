import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import ArrowIcon from './ArrowIcon';

// WhatsApp needs the number as digits only, with country code (e.g. 919876543210)
const whatsappNumber = import.meta.env.VITE_PHONE_NUMBER?.replace(/\D/g, '');

const whatsappLink = (productName) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Sandesh, I'm interested in the ${productName} for my business.`)}`;

const ai = <span className="font-light italic text-gray-300 lowercase font-serif">ai</span>;

const products = [
  {
    name: 'AI Revenue & Payment Follow-Up Assistant',
    title: <>{ai} Revenue & Payment Follow-Up Assistant</>,
    description: "Automatically follows up on pending invoices and payments with polite, personalised reminders on WhatsApp, SMS or email — so you get paid on time without awkward chasing.",
    idealFor: ['Clinics', 'Agencies', 'Contractors', 'Coaching'],
  },
  {
    name: 'AI Lead Recovery & WhatsApp Sales Assistant',
    title: <>{ai} Lead Recovery & WhatsApp Sales Assistant</>,
    description: "Replies to new enquiries on WhatsApp instantly, answers common questions, and follows up with leads who went quiet — so no potential customer slips through the cracks.",
    idealFor: ['Real Estate', 'Salons', 'Clinics', 'Retail'],
  },
  {
    name: 'AI Google Review System',
    title: <>{ai} Google Review System</>,
    description: "Sends customers a one-tap Google review request after their visit, reminds those who haven't left one yet, and drafts professional replies to every review — keeping your profile active and trusted.",
    idealFor: ['Cafes', 'Restaurants', 'Salons', 'Shops'],
  },
  {
    name: 'AI Booking & No-Show Reduction System',
    title: <>{ai} Booking & No-Show Reduction System</>,
    description: "Lets customers book any time, then sends automatic confirmations and reminders before every appointment, with easy rescheduling — so fewer empty slots and more of your day stays booked.",
    idealFor: ['Dental Clinics', 'Salons & Spas', 'Consultants'],
  },
];

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
            <div key={product.name} className={`group/card flex flex-col py-8 md:py-10 border-b border-white/20 ${idx % 2 === 0 ? 'md:pr-10 md:border-r' : 'md:pl-10'}`}>
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="text-white text-lg md:text-2xl font-medium">0{idx + 1}</span>
                <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/40 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                  Early access
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-tight mb-4">
                {product.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-gray-500 text-[11px] uppercase tracking-widest mr-1">Ideal for</span>
                {product.idealFor.map((type) => (
                  <span key={type} className="text-xs text-gray-300 border border-white/15 rounded-full px-3 py-1">
                    {type}
                  </span>
                ))}
              </div>

              {whatsappNumber ? (
                <a
                  href={whatsappLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`I'm interested in the ${product.name} — chat on WhatsApp`}
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  I'm interested
                  <ArrowIcon className="w-3 h-3 transition-transform duration-300 group-hover/card:rotate-45" />
                </a>
              ) : (
                <Link
                  to="/#contact"
                  className="mt-auto self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] transition-colors"
                >
                  I'm interested
                  <ArrowIcon className="w-3 h-3 transition-transform duration-300 group-hover/card:rotate-45" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Project;
