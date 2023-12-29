import React, { useState, useEffect } from 'react';

const AddBug = () => {
  const [projects, setProjects] = useState([]);
  const [bugData, setBugData] = useState({
    numeBug: '',
    severitate: '',
    prioritate: '',
    descriere: '',
    linkCommit: '',
    ProjectId: null,
    status: 'nerezolvat',
  });

  useEffect(() => {
    //const userId = 8; // You can get the user ID dynamically
    const userId=window.sessionStorage.getItem("userId");
    const apiUrl = `http://localhost:5000/api/userProjects/${userId}`;
  
    const getProjects = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // setProjects(data);
        const uniqueProjects = [...new Set(data.map(project => project.id))]
        .map(id => data.find(project => project.id === id));
  
        setProjects(uniqueProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
  
    getProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBugData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    //console.log([name]+':'+value);
  };

  const handleSelectChange = (e) => {
    const {value } = e.target;
    const projectId = parseInt(value, 10);
    setBugData((prevData) => ({
      ...prevData,
      ['ProjectId']: value,
    }));
    //console.log('ProjectId:'+projectId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bugData),
      });

      if (response.ok) {
        console.log('Bug adăugat cu succes!');
        // Aici poți face orice acțiune adițională sau redirecționa către altă pagină
      } else {
        console.error('Eroare la adăugarea bug-ului:', response.statusText);
      }
    } catch (error) {
      console.error('Eroare la adăugarea bug-ului:', error);
    }
  };

  return (
    <div>
      <h2>Adaugă Bug</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nume Bug:
          <input type="text" name="numeBug" value={bugData.numeBug} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Severitate:
          <input type="text" name="severitate" value={bugData.severitate} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Prioritate:
          <input type="text" name="prioritate" value={bugData.prioritate} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Descriere:
          <textarea name="descriere" value={bugData.descriere} onChange={handleInputChange}></textarea>
        </label>
        <br />
        <label>
          Link Commit:
          <input type="text" name="linkCommit" value={bugData.linkCommit} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Proiect:
          <select name="ProjectId" value={bugData.ProjectId || ''} onChange={handleSelectChange}>
            <option value="" disabled>
              Alege un proiect
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.numeProiect}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Adaugă Bug</button>
      </form>
    </div>
  );
};

export default AddBug;
