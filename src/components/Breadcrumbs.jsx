import { Link } from 'react-router-dom';

// items: [{ name, to }] — the last item is the current page
const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] md:text-xs uppercase tracking-widest text-gray-500">
      {[{ name: 'Home', to: '/' }, ...items].map((item, idx, all) => {
        const isLast = idx === all.length - 1;
        return (
          <li key={item.to} className="flex items-center gap-2">
            {isLast ? (
              <span aria-current="page" className="text-gray-300">{item.name}</span>
            ) : (
              <>
                <Link to={item.to} className="hover:text-[#ccff00] transition-colors">{item.name}</Link>
                <span aria-hidden="true" className="text-gray-700">/</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
