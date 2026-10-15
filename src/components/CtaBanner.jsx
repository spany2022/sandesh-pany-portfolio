import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import ArrowIcon from './ArrowIcon';
import { whatsappNumber, whatsappLink } from '../utils/whatsapp';

// Lime call-to-action block: WhatsApp (with a pre-filled message) + contact form
const CtaBanner = ({ eyebrow = 'Ready when you are', title, message }) => (
  <section className="bg-[#ccff00] text-black rounded-sm px-6 py-12 md:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
    <div>
      <p className="text-xs md:text-sm font-bold tracking-widest uppercase mb-4 text-black/70">{eyebrow}</p>
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95]">{title}</h2>
    </div>
    <div className="flex items-center gap-4 flex-wrap">
      {whatsappNumber && (
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-black text-[#ccff00] text-xs md:text-sm font-medium border border-black hover:bg-transparent hover:text-black transition-colors inline-flex items-center gap-2">
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          Chat on WhatsApp
        </a>
      )}
      <Link to="/#contact" className="px-6 py-3 rounded-full border border-black/40 text-black text-xs md:text-sm hover:bg-black hover:text-[#ccff00] transition-colors inline-flex items-center gap-2">
        Send an Enquiry
        <ArrowIcon />
      </Link>
    </div>
  </section>
);

export default CtaBanner;
