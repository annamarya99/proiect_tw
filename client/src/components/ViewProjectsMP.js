import React, { useState, useEffect } from 'react';

const ProjectsList = () => {
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // const userId = 8; //!!HARDCODAT!!
    const userId=window.sessionStorage.getItem("userId");

    fetch(`http://localhost:5000/api/proiecteUtilizator/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data from API:', data);
        //setProjects(data);

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
              <td>{project.numeProiect}</td>
              <td>{project.repository}</td>
              <td>
                <ul>
                  {/* <li>{project.MembruEchipaUsername}</li> */}
                  {/* Add more users from MembruEchipa if needed */}
                  {project.MembruEchipaUsername.map((username, index) => (
                    <li key={index}>{username}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {/* <li>{project.TesterProiectUsername}</li> */}
                  {/* Add more users from TesterProiect if needed */}
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

