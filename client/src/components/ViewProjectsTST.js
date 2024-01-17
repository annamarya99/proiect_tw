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

        const updatedProjectResponse = await fetch(`http://localhost:5000/api/proiecte`);
        const updatedProject = await updatedProjectResponse.json();
  
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
              <td data-label="Nume proiect:">{project.numeProiect}</td>
              <td data-label="Repository:">{project.repository}</td>
              <td data-label="Echipa:">
                <ul>
                {project.EchipaProiectului && project.EchipaProiectului.length > 0 ? (
                  project.EchipaProiectului.map(user => (
                    <li key={user.id}>{user.username}</li>
                  ))
                ) : (
                  <li key={`no-test-team-${project.id}`}>Niciun membru in echipa</li>
                )}
                </ul>
              </td>
              <td data-label="Testeri:">
                {project.EchipaTestare && project.EchipaTestare.length > 0 ? (
                  project.EchipaTestare.map(user => (
                    <li key={user.id}>{user.username}</li>
                  ))
                ) : (
                  <li key={`no-test-team-${project.id}`}>Niciun tester</li>
                )}
              </td>
              <td data-label="Status:">
                {!project.EchipaTestare || !project.EchipaTestare.some(user => user.id === parseInt(window.sessionStorage.getItem("userId"), 10)) ? (
                  <button onClick={() => handleInscriereProiect(project.id)}>Vreau să mă înregistrez</button>
                ) : (
                  <p id='inre'>Deja înregistrat</p>
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