import React, { useState, useEffect } from 'react';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/proiecte';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Eroare la încărcarea proiectelor:', error));
  }, []);

  return (
    <div>
      <h2>Proiecte</h2>
      <table>
        <thead>
          <tr>
            <th>Nume Proiect</th>
            <th>Repository</th>
            <th>Echipa Proiectului</th>
            <th>Testerii Proiectului</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.numeProiect}</td>
              <td>{project.repository}</td>
              <td>
                <ul>
                  {project.EchipaProiectului.map(user => (
                    <li key={user.id}>{user.username}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {project.EchipaTestare.map(user => (
                    <li key={user.id}>{user.username}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;