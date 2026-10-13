import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Services from '../components/Services';
import Project from '../components/Project';
import ContactSection from '../components/Contact';
import Footer from '../components/Footer';
import { scrollToHash } from '../utils/scroll';

const Home = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'Sandesh Pany — AI Full-Stack Developer';
  }, []);

  const handlePreloadComplete = () => {
    setPreloaderComplete(true);
    // Arriving at e.g. /#contact: jump there once the intro releases scrolling
    if (hash) scrollToHash(hash);
  };

  return (
    <main>
      <Hero onPreloadComplete={handlePreloadComplete} />

      {preloaderComplete && <Navbar />}
      <About />
      <Services />
      <Project />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Home;
