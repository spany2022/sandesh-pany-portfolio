// Numbered steps laid out in columns (stacked on mobile)
const StepGrid = ({ steps }) => (
  <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/20">
    {steps.map((step, idx) => (
      <li key={step.title} className="py-8 pr-6 border-b border-white/20 lg:border-b-0">
        <span className="block text-[#ccff00] text-sm font-bold mb-4">{String(idx + 1).padStart(2, '0')}</span>
        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">{step.title}</h3>
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">{step.text}</p>
      </li>
    ))}
  </ol>
);

export default StepGrid;
