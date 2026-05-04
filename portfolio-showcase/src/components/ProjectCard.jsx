function ProjectCard({ project }) {
  return (
    <div className="project-card">

      {/* EMOJI HEADER */}
      <div className="card-header">
        <span className="card-emoji">{project.emoji}</span>
        <span className="card-category">{project.category}</span>
      </div>

      {/* CARD BODY */}
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">
          {project.description.length > 120
            ? project.description.substring(0, 120) + "..."
            : project.description}
        </p>

        {/* TECH STACK */}
        <div className="tech-stack">
          {project.tech.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CARD FOOTER */}
      <div className="card-footer">
        <span className="card-date">📅 {project.date}</span>

        <div className="card-links">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-github"
          >
            GitHub
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="btn-live"
          >
            Live →
          </a>
        </div>
      </div>

    </div>
  );
}

export default ProjectCard;