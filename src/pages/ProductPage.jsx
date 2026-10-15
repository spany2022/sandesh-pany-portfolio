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
import { products, getProduct } from '../data/products';
import { whatsappNumber, whatsappLink, interestMessage } from '../utils/whatsapp';

const ProductPage = () => {
  const { slug } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <PageLayout>
      <Breadcrumbs items={[{ name: 'AI Solutions', to: '/ai-solutions' }, { name: product.name, to: `/ai-solutions/${product.slug}` }]} />

      {/* Header */}
      <p className="inline-flex items-center gap-2 text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
        AI for local businesses · Early access
      </p>
      <h1 className="text-[11vw] md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] uppercase max-w-6xl mb-6">
        <ProductName name={product.name} />
      </h1>
      <p className="font-serif italic text-gray-300 text-2xl md:text-4xl mb-10">{product.tagline}</p>
      <div className="flex flex-wrap items-center gap-4 mb-10">
        {whatsappNumber && (
          <a href={whatsappLink(interestMessage(product.name))} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-[#ccff00] text-black text-sm font-medium hover:bg-[#b3e600] transition-colors inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            I'm interested
          </a>
        )}
        <Link to="/#contact" className="px-6 py-3 rounded-full border border-white/30 text-white text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2">
          Ask a question
          <ArrowIcon />
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-20 md:mb-32">
        <span className="text-gray-500 text-[11px] uppercase tracking-widest mr-1">Ideal for</span>
        {product.idealFor.map((type) => (
          <span key={type} className="text-xs text-gray-300 border border-white/15 rounded-full px-3 py-1">{type}</span>
        ))}
      </div>

      {/* Problem & solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 mb-24 md:mb-36">
        {[
          { id: '01', title: 'The problem', text: product.problem },
          { id: '02', title: 'The solution', text: product.solution },
        ].map((block) => (
          <div key={block.id} className="border-t border-white/20 pt-8">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[#ccff00] text-sm font-bold">{block.id}</span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{block.title}</h2>
            </div>
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">{block.text}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mb-24 md:mb-36">
        <SectionTitle>
          What it
          <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">does</span>
        </SectionTitle>
        <FeatureRows features={product.features} />
      </section>

      {/* How it works */}
      <section className="mb-24 md:mb-36">
        <SectionTitle>
          How it
          <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">works</span>
        </SectionTitle>
        <StepGrid steps={product.steps} />
      </section>

      {/* FAQ */}
      <section className="mb-24 md:mb-32">
        <SectionTitle>
          Common
          <span className="font-light italic text-gray-300 lowercase font-serif pl-3 md:pl-4">questions</span>
        </SectionTitle>
        <FaqList faqs={product.faqs} />
      </section>

      <div className="mb-24 md:mb-32">
        <CtaBanner
          eyebrow="Early access is open"
          title={<>Want this for<span className="block font-light italic lowercase font-serif">your business?</span></>}
          message={interestMessage(product.name)}
        />
      </div>

      {/* Other products */}
      <section>
        <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-6">More AI solutions</p>
        <div className="border-t border-white/20">
          {others.map((other) => (
            <Link key={other.slug} to={`/ai-solutions/${other.slug}`} className="group flex items-center justify-between gap-6 py-6 border-b border-white/20">
              <span className="text-lg md:text-3xl font-black uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                <ProductName name={other.name} />
              </span>
              <ArrowIcon className="w-6 h-6 md:w-8 md:h-8 shrink-0 text-[#ccff00] transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default ProductPage;
