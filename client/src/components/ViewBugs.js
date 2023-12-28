import React, { useEffect, useState } from 'react';

const ViewBugs = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    //const userId = 5; //!!HARDCODAT!!
    const userId=window.sessionStorage.getItem("userId");
    const apiUrl = `http://localhost:5000/api/bugs/${userId}`;

    const fetchBugs = async () => {
      try {
        const response = await fetch(apiUrl);
        const bugsData = await response.json();
        setBugs(bugsData);
      } catch (error) {
        console.error('Error loading bugs:', error);
      }
    };

    fetchBugs();
  }, []);

  return (
    <div>
      <h2>Bug-uri</h2>
      <ul>
        {bugs.map(bug => (
          <li key={bug.id}>
            <p>Id: {bug.id}</p>
            <p>Nume Bug: {bug.numeBug}</p>
            <p>Severitate: {bug.severitate}</p>
            <p>Prioritate: {bug.prioritate}</p>
            <p>Descriere: {bug.descriere}</p>
            <p>Link Commit: {bug.linkCommit}</p>
            <p>Proiect asociat: {bug.Project ? bug.Project.numeProiect : 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBugs;
