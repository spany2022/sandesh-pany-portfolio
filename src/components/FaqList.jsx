// Native <details> keeps every answer in the HTML for search engines
const FaqList = ({ faqs }) => (
  <div className="border-t border-white/20">
    {faqs.map((faq) => (
      <details key={faq.q} className="group border-b border-white/20 py-6 md:py-7">
        <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <h3 className="text-base md:text-xl font-bold leading-snug group-hover:text-[#ccff00] transition-colors">{faq.q}</h3>
          <span aria-hidden="true" className="text-[#ccff00] text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
        </summary>
        <p className="mt-4 text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">{faq.a}</p>
      </details>
    ))}
  </div>
);

export default FaqList;
