import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // FETCH all projects
  useEffect(() => {
    fetch('http://localhost:3001/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error:', err)
        setLoading(false)
      })
  }, [])

  // ADD new project
  const addProject = (newProject) => {
    fetch('http://localhost:3001/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    })
      .then(res => res.json())
      .then(data => setProjects([...projects, data]))
  }

  return (
    <div className="app">
      <Navbar />
      <Home
        projects={projects}
        loading={loading}
        onAddProject={addProject}
      />
    </div>
  )
}

export default App