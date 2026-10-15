import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white w-full px-6 text-center">
      <p className="text-[#ccff00] text-xs md:text-sm font-bold tracking-widest uppercase mb-6">Error 404</p>
      <h1 className="text-[28vw] md:text-[14rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 leading-none mb-6">
        404
      </h1>
      <p className="text-gray-400 text-base md:text-lg font-light mb-10 max-w-md">
        This page doesn't exist — but plenty of good work does.
      </p>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <Link to="/" className="px-8 py-3 rounded-full border border-[#ccff00] text-black bg-[#ccff00] font-bold text-sm md:text-base hover:bg-black hover:text-[#ccff00] transition-colors">
          Go Home
        </Link>
        <Link to="/work" className="px-8 py-3 rounded-full border border-white/30 text-white text-sm md:text-base hover:bg-white hover:text-black transition-colors">
          View Work
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
