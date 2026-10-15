import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import ArrowIcon from './ArrowIcon';
import { whatsappNumber, whatsappLink, interestMessage } from '../utils/whatsapp';

const aiMark = <span className="font-light italic text-gray-300 lowercase font-serif">ai</span>;

// "AI Google Review System" → italic serif "ai" + the rest, like the other headings
export const ProductName = ({ name }) =>
  name.startsWith('AI ') ? <>{aiMark} {name.slice(3)}</> : name;

const ProductCard = ({ product, index, className = '' }) => (
  <div className={`group/card flex flex-col py-8 md:py-10 border-b border-white/20 ${className}`}>
    <div className="flex items-center justify-between gap-4 mb-5">
      <span className="text-white text-lg md:text-2xl font-medium">{String(index + 1).padStart(2, '0')}</span>
      <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/40 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
        Early access
      </span>
    </div>
    <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase leading-tight mb-4">
      <Link to={`/ai-solutions/${product.slug}`} className="hover:text-[#ccff00] transition-colors">
        <ProductName name={product.name} />
      </Link>
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

    <div className="mt-auto flex items-center gap-3 flex-wrap">
      {whatsappNumber ? (
        <a
          href={whatsappLink(interestMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`I'm interested in the ${product.name} — chat on WhatsApp`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] transition-colors"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          I'm interested
          <ArrowIcon className="w-3 h-3 transition-transform duration-300 group-hover/card:rotate-45" />
        </a>
      ) : (
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] text-black text-xs md:text-sm font-medium hover:bg-[#b3e600] transition-colors"
        >
          I'm interested
          <ArrowIcon className="w-3 h-3 transition-transform duration-300 group-hover/card:rotate-45" />
        </Link>
      )}
      <Link
        to={`/ai-solutions/${product.slug}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white text-xs md:text-sm hover:bg-white hover:text-black transition-colors"
      >
        Learn more<span className="sr-only"> about the {product.name}</span>
      </Link>
    </div>
  </div>
);

export default ProductCard;
