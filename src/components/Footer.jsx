import { Link } from 'react-router-dom';
import footerBg from '../assets/Footer/Footer.webp';
import { industries } from '../data/industries';
import { products } from '../data/products';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#service' },
  { label: 'Work', to: '/work' },
  { label: 'AI Solutions', to: '/ai-solutions' },
  { label: 'Contact', to: '/#contact' },
];

const columns = [
  { title: 'Explore', span: 'lg:col-span-2', links: footerLinks },
  {
    title: 'Websites for',
    span: 'lg:col-span-3',
    to: '/websites',
    links: industries.map((industry) => ({ label: industry.name, to: `/websites/${industry.slug}` })),
  },
  {
    title: 'AI Solutions',
    span: 'lg:col-span-2',
    to: '/ai-solutions',
    links: products.map((product) => ({ label: product.name, to: `/ai-solutions/${product.slug}` })),
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12 px-6 md:px-16 min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Scale and translate the image to crop the top */}
        <div
          className="absolute inset-0 bg-cover bg-bottom w-full h-full scale-[1.3] md:scale-[1.5] origin-bottom translate-y-[10%]"
          style={{ backgroundImage: `url(${footerBg})` }}
        />
        {/* Dark overlay at the top to blend the background smoothly */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-[calc(100vh-6rem)] justify-between">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-2 lg:col-span-5 flex flex-col items-start gap-5">
            <p className="text-gray-400 text-sm">Connect with me</p>
            <a href="mailto:sandeshpany24@gmail.com" className="text-xl md:text-3xl xl:text-4xl font-medium hover:text-gray-300 transition-colors wrap-break-word">
              sandeshpany24@gmail.com
            </a>
            <p className="text-gray-400 text-sm max-w-sm">
              Web designer & AI developer based in Bhubaneswar, Odisha — working with businesses across India.
            </p>
            <Link to="/#contact" className="mt-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Get in touch
            </Link>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className={column.span}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                {column.to ? (
                  <Link to={column.to} className="hover:text-[#ccff00] transition-colors">{column.title}</Link>
                ) : column.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Huge Text Section */}
        <div className="w-full text-center flex-1 flex items-center justify-center min-h-[30vh] py-10">
          <p aria-hidden="true" className="text-[12vw] font-bold leading-none tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>
            SANDESH PANY
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-400 pt-6">
          <p>© {new Date().getFullYear()} Sandesh Pany. All Rights Reserved.</p>
          <p>Bhubaneswar, Odisha, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
