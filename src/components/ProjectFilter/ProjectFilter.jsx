export default function ProjectFilter({ types, statuses, activeType, activeStatus, onTypeChange, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-10 sm:mb-14">
      <div>
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
      <div>
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">Статус</span>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={`px-4 py-1.5 text-sm border transition-colors interactive-hover ${
                activeStatus === status
                  ? 'border-accent text-accent'
                  : 'border-white/20 text-gray-400 hover:border-paper hover:text-paper'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
