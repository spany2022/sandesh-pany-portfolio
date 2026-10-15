import PageLayout from '../components/PageLayout';
import Breadcrumbs from '../components/Breadcrumbs';
import CtaBanner from '../components/CtaBanner';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const AiSolutions = () => (
  <PageLayout>
    <Breadcrumbs items={[{ name: 'AI Solutions', to: '/ai-solutions' }]} />

    {/* Header */}
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 md:mb-24">
      <h1 className="text-[12vw] md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-[0.92] uppercase">
        AI automation
        <span className="block font-light italic lowercase font-serif text-gray-300">for local businesses</span>
      </h1>
      <div className="lg:w-4/12 lg:pb-4">
        <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
          Built in Bhubaneswar · For all India
        </p>
        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
          Practical AI systems that save time and bring in revenue — get paid faster, win back leads on WhatsApp, earn more Google reviews and cut no-shows. All four are in early access, set up and tailored for your business.
        </p>
      </div>
    </div>

    <section className="grid grid-cols-1 md:grid-cols-2 border-t border-white/20 mb-24 md:mb-32">
      {products.map((product, idx) => (
        <ProductCard key={product.slug} product={product} index={idx} className={idx % 2 === 0 ? 'md:pr-10 md:border-r' : 'md:pl-10'} />
      ))}
    </section>

    <CtaBanner
      eyebrow="Early access is open"
      title={<>Not sure which<span className="block font-light italic lowercase font-serif">one you need?</span></>}
      message="Hi Sandesh, I'd like to know which AI solution would suit my business."
    />
  </PageLayout>
);

export default AiSolutions;
