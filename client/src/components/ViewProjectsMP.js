import React, { useState, useEffect } from 'react';

const ProjectsList = () => {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const userId=window.sessionStorage.getItem("userId");

    fetch(`http://localhost:5000/api/proiecteUtilizator/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data from API:', data);

        const groupedProjects = data.reduce((acc, project) => {
          const existingProject = acc.find(item => item.id === project.id);

          if (existingProject) {
            if (!existingProject.MembruEchipaUsername.includes(project.MembruEchipaUsername)) {
              existingProject.MembruEchipaUsername.push(project.MembruEchipaUsername);
            }
            if (!existingProject.TesterProiectUsername.includes(project.TesterProiectUsername)) {
              existingProject.TesterProiectUsername.push(project.TesterProiectUsername);
            }
          } else {
            acc.push({
              id: project.id,
              numeProiect: project.numeProiect,
              repository: project.repository,
              MembruEchipaUsername: [project.MembruEchipaUsername],
              TesterProiectUsername: [project.TesterProiectUsername],
            });
          }
          return acc;
        }, []);

        setProjects(groupedProjects);
      })
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
          {projects?.map(project => (
            <tr key={project.id}>
              <td data-label="Nume Proiect">{project.numeProiect}</td>
              <td data-label="Repository">{project.repository}</td>
              <td data-label="Echipa">
                <ul>
                  {project.MembruEchipaUsername.map((username, index) => (
                    <li key={index}>{username}</li>
                  ))}
                </ul>
              </td>
              <td data-label="Testeri">
                <ul>
                  {project.TesterProiectUsername.map((username, index) => (
                    <li key={index}>{username}</li>
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

