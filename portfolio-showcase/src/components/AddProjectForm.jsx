import { useState } from 'react'

const initialForm = {
  title: '',
  description: '',
  category: 'Web Development',
  tech: '',
  emoji: '💻',
  github: '',
  live: '',
  date: new Date().toISOString().split('T')[0]
}

function AddProjectForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    if (!form.tech.trim()) newErrors.tech = 'At least one technology is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newProject = {
      ...form,
      tech: form.tech.split(',').map(t => t.trim()).filter(Boolean)
    }

    onAdd(newProject)
    setForm(initialForm)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>➕ Add New Project</h2>
        <p>Share your latest work with the world</p>
      </div>

      {success && (
        <div className="alert-success">
          ✅ Project added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="project-form">

        <div className="form-grid">

          {/* TITLE */}
          <div className="form-group">
            <label>Project Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g My Awesome App"
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && (
              <span className="error-text">{errors.title}</span>
            )}
          </div>

          {/* CATEGORY */}
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Web Development</option>
              <option>UI/UX Design</option>
              <option>Mobile App</option>
              <option>Data Science</option>
              <option>Other</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project in detail..."
              rows={4}
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          {/* TECH STACK */}
          <div className="form-group">
            <label>Tech Stack * (comma separated)</label>
            <input
              name="tech"
              value={form.tech}
              onChange={handleChange}
              placeholder="e.g React, Node.js, CSS"
              className={errors.tech ? 'input-error' : ''}
            />
            {errors.tech && (
              <span className="error-text">{errors.tech}</span>
            )}
          </div>

          {/* EMOJI */}
          <div className="form-group">
            <label>Project Emoji</label>
            <input
              name="emoji"
              value={form.emoji}
              onChange={handleChange}
              placeholder="e.g 🚀"
            />
          </div>

          {/* GITHUB */}
          <div className="form-group">
            <label>GitHub URL</label>
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* LIVE URL */}
          <div className="form-group">
            <label>Live URL</label>
            <input
              name="live"
              value={form.live}
              onChange={handleChange}
              placeholder="https://myproject.com"
            />
          </div>

          {/* DATE */}
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

        </div>

        <button type="submit" className="submit-btn">
          ➕ Add Project
        </button>

      </form>
    </div>
  )
}

export default AddProjectForm