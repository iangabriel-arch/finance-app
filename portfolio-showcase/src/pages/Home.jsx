import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import AddProjectForm from '../components/AddProjectForm'
import SearchBar from '../components/SearchBar'

function Home({ projects, loading, onAddProject }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Web Development', 'UI/UX Design', 'Mobile App', 'Data Science', 'Other']

  // FILTER projects
  const filtered = projects.filter(project => {
    const matchesQuery =
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
      project.description.toLowerCase().includes(query.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory

    return matchesQuery && matchesCategory
  })

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">⏳</div>
        <p>Loading projects...</p>
      </div>
    )
  }

  return (
    <main>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>My Project <span className="highlight">Showcase</span></h1>
          <p>A collection of my work as a developer and designer</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {[...new Set(projects.flatMap(p => p.tech))].length}
              </span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {[...new Set(projects.map(p => p.category))].length}
              </span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section">

        <div className="section-header">
          <h2>All Projects</h2>
          <p>Browse through my work</p>
        </div>

        {/* SEARCH BAR */}
        <SearchBar
          query={query}
          onSearch={setQuery}
          totalResults={filtered.length}
        />

        {/* CATEGORY FILTERS */}
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        {filtered.length > 0 ? (
          <div className="projects-grid">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-emoji">🔍</span>
            <h3>No projects found</h3>
            <p>Try searching for something else or clear your filters</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All') }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          </div>
        )}

      </section>

      {/* ADD PROJECT FORM */}
      <section id="add-project" className="add-section">
        <AddProjectForm onAdd={onAddProject} />
      </section>

    </main>
  )
}

export default Home