function SearchBar({ query, onSearch, totalResults }) {
  return (
    <div className="search-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search projects by name or technology..."
          className="search-input"
        />
        {query && (
          <button
            className="clear-btn"
            onClick={() => onSearch('')}
          >
            ✕
          </button>
        )}
      </div>
      {query && (
        <p className="search-results-count">
          {totalResults} project{totalResults !== 1 ? 's' : ''} found for "{query}"
        </p>
      )}
    </div>
  )
}

export default SearchBar