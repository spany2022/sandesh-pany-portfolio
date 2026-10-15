// Numbered full-width rows that turn lime on hover, matching the Services list
const FeatureRows = ({ features }) => (
  <div className="-mx-6 md:-mx-16 border-t border-white/20">
    {features.map((feature, idx) => (
      <div key={feature.title} className="group/row border-b border-white/20 px-6 md:px-16 py-6 md:py-8 grid grid-cols-[2rem_1fr] md:grid-cols-[3.5rem_1fr] lg:grid-cols-[3.5rem_5fr_6fr] gap-x-6 md:gap-x-16 gap-y-2 items-baseline transition-colors duration-300 hover:bg-[#ccff00]">
        <span className="text-lg md:text-3xl font-medium text-white group-hover/row:text-black transition-colors duration-300">
          {String(idx + 1).padStart(2, '0')}
        </span>
        <h3 className="text-sm md:text-xl lg:text-2xl font-black uppercase tracking-wide text-white group-hover/row:text-black transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="col-start-2 lg:col-start-3 text-gray-400 text-sm md:text-base font-light leading-relaxed group-hover/row:text-black/80 transition-colors duration-300">
          {feature.text}
        </p>
      </div>
    ))}
  </div>
);

export default FeatureRows;
