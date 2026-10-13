import { Link } from 'react-router-dom';
import footerBg from '../assets/Footer/Footer.png';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#service' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/#contact' },
];

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12 px-6 md:px-16 h-screen flex flex-col justify-between overflow-hidden">
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

      <div className="relative z-10 flex flex-col h-full justify-between">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-10 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div>
              <p className="text-gray-400 text-sm mb-2">Connect with me</p>
              <a href="mailto:sandeshpany24@gmail.com" className="text-xl md:text-5xl font-medium hover:text-gray-300 transition-colors wrap-break-word">
                sandeshpany24@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mt-4">
              {footerLinks.map((link) => (
                <Link key={link.label} to={link.to} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end text-left md:text-right w-full md:w-auto mt-4 md:mt-0">
            <h3 className="text-lg md:text-2xl font-medium mb-2">Let's build something</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Open for freelance opportunities and collaborations.
            </p>
            <Link to="/#contact" className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Get in touch
            </Link>
          </div>
        </div>

        {/* Huge Text Section */}
        <div className="w-full text-center flex-1 flex items-center justify-center min-h-0">
          <p aria-hidden="true" className="text-[12vw] font-bold leading-none tracking-tighter" style={{ fontFamily: 'Inter, sans-serif' }}>
            SANDESH PANY
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 mt-auto pt-6">
          <p>© {new Date().getFullYear()} Sandesh Pany. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
