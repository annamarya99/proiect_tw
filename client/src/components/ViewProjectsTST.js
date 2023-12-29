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


  const handleInscriereProiect = async (projectId) => {
    const id = window.sessionStorage.getItem('userId');
    const userId=parseInt(id,10);
    try {
      const response = await fetch('http://localhost:5000/api/inscriereTestare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, projectId }),
      });

      if (response.ok) {
        console.log('Utilizatorul a fost înscris în proiect cu succes!');
        // Actualizare lista de proiecte după înregistrare
        // const updatedProjects = projects.map(project => {
        //   if (project.id === projectId) {
        //     return { ...project, UtilizatorInscris: true };
        //   }
        //   return project;
        // });
        // setProjects(updatedProjects);


        const updatedProjectResponse = await fetch(`http://localhost:5000/api/proiecte`);
        const updatedProject = await updatedProjectResponse.json();
  
        // Actualizați lista de proiecte cu proiectul actualizat
        // const updatedProjects = projects.map(project => {
        //   if (project.id === projectId) {
        //     return {updatedProject};
        //   }
        //   return project;
        // });
        setProjects(updatedProject);

      } else {
        console.error('Eroare la înregistrarea în proiect:', response.statusText);
      }
    } catch (error) {
      console.error('Eroare la înregistrarea în proiect:', error);
    }
  };


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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.numeProiect}</td>
              <td>{project.repository}</td>
              <td>
                <ul>
                {project.EchipaProiectului && project.EchipaProiectului.length > 0 ? (
                  project.EchipaProiectului.map(user => (
                    <li key={user.id}>{user.username}</li>
                  ))
                ) : (
                  <li key={`no-test-team-${project.id}`}>No users in test team</li>
                )}
                </ul>
              </td>
              <td>
                {project.EchipaTestare && project.EchipaTestare.length > 0 ? (
                  project.EchipaTestare.map(user => (
                    <li key={user.id}>{user.username}</li>
                  ))
                ) : (
                  <li key={`no-test-team-${project.id}`}>No users in test team</li>
                )}
              </td>
              <td>
                {!project.EchipaTestare || !project.EchipaTestare.some(user => user.id === parseInt(window.sessionStorage.getItem("userId"), 10)) ? (
                  <button onClick={() => handleInscriereProiect(project.id)}>Vreau să mă înregistrez</button>
                ) : (
                  <p>Deja înregistrat</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;