import Navbar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="bg-[#050505] text-white pt-32 md:pt-40 pb-24 px-6 md:px-16">
      {children}
    </main>
    <Footer />
  </>
);

export default PageLayout;
