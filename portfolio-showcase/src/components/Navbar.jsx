function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">💼</span>
        <span className="navbar-title">MyPortfolio</span>
      </div>
      <div className="navbar-links">
        <a href="#projects">Projects</a>
        <a href="#add-project">Add Project</a>
      </div>
    </nav>
  )
}

export default Navbar