

const SegmentedControl = ({ filter, setFilter }) => {
    const filters = ['all', 'open', 'closed'];
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-foreground/5 p-1">
      {
        filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors capitalize cursor-pointer ${
                filter === f
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
            >
                { f }
            </button>
        ))
      }
    </div>
  )
}

export default SegmentedControl
