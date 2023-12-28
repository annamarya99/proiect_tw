import React, { useState, useEffect } from 'react';

const ProjectsList = () => {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const userId = 8; //!!HARDCODAT!!

    fetch(`http://localhost:5000/api/proiecteUtilizator/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data from API:', data);
        setProjects(data);
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
              <td>{project.numeProiect}</td>
              <td>{project.repository}</td>
              <td>
                <ul>
                  <li>{project.MembruEchipaUsername}</li>
                  {/* Add more users from MembruEchipa if needed */}
                </ul>
              </td>
              <td>
                <ul>
                  <li>{project.TesterProiectUsername}</li>
                  {/* Add more users from TesterProiect if needed */}
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

