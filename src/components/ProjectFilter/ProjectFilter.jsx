export default function ProjectFilter({ types, activeType, onTypeChange }) {
  return (
    <div className="mb-10 sm:mb-14">
      <span className="block text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Тип</span>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onTypeChange(type)}
            className={`px-4 py-1.5 text-sm border transition-colors interactive-hover ${
              activeType === type
                ? 'border-accent text-accent'
                : 'border-white/20 text-gray-400 hover:border-paper hover:text-paper'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}