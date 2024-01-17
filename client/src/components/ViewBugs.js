import React, { useEffect, useState } from 'react';


const fetchData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};



const ViewBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [bugLinkCommit, setBugLinkCommit] = useState('');
  const [commitLinkInput, setCommitLinkInput] = useState('');

  useEffect(() => {

  fetchBugs();
}, []);

  const fetchBugs = async () => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const apiUrl = `http://localhost:5000/api/bugs/${userId}`;
      const bugsData = await fetchData(apiUrl);
      setBugs(bugsData);
    } catch (error) {
      console.error(error);
    }
  };



  const allocateBug = async (bugId) => {
    try {
      const id = parseInt(window.sessionStorage.getItem("userId"), 10);
      await fetch(`http://localhost:5000/api/bugs/${bugId}/allocate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id, bugId:bugId }),
      });
      fetchBugs(); 
    } catch (error) {
      console.error('Error allocating bug:', error);
    }
  };



  const setBugLink = (bugId, newLinkCommit) => {
    const updatedBugs = bugs.map(bug =>
      bug.id === bugId ? { ...bug, linkCommit: newLinkCommit } : bug
    );
    setBugs(updatedBugs);
  };


  const resolveBug = async (bugId, newLinkCommit, userId) => {
    try {
      const userId=window.sessionStorage.getItem("userId");
      await fetch(`http://localhost:5000/api/bugs/${bugId}/resolve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bugId:bugId, linkCommit: newLinkCommit,userId }),
      });
      setBugLink(bugId, newLinkCommit);
      fetchBugs(); 
    } catch (error) {
      console.error('Error resolving bug:', error);
    }
  };



  function getUserPrivillege() {
    return window.sessionStorage.getItem("userPrivillege");
   }

  return (
    <div id='viewbugs'>
      <h2>Bug-uri</h2>
      <ul>
        {bugs.map(bug => (
          <li key={bug.id} id={`bug-${bug.id}`} className="bug-item">
          <p><b>Id:</b> {bug.id}</p>
            <p> <b>Nume Bug:</b> {bug.numeBug}</p>
            <p> <b>Severitate:</b> {bug.severitate}</p>
            <p><b>Prioritate:</b> {bug.prioritate}</p>
            <p><b>Descriere:</b> {bug.descriere}</p>
            <p id='link'><b>Link Commit:</b> {bug.linkCommit}</p>
            <p><b>Proiect asociat:</b> {bug.ProjectId ? bug.numeProiect : 'N/A'}</p>
            <p><b>Status:</b> {bug.status}</p>

            {bug.status === 'nerezolvat' && getUserPrivillege()=='MP' && !bug.alocatUserului && (
              <button onClick={() => allocateBug(bug.id)}>Alocă pentru rezolvare</button>
            )}
            {bug.status === 'alocat' && getUserPrivillege() === 'MP' && bug.alocatUserului === parseInt(window.sessionStorage.getItem("userId"),10) && (
              <>
                {/* <p>Link Commit: {bug.linkCommit || 'N/A'}</p> */}
                <p><b>Link commit rezolvare:</b> </p>
                {/* <input
                  type="text"
                  placeholder="Link Commit"
                  value={bug.linkCommit}
                  onChange={(e) => {
                    const newLink = e.target.value;
                    setBugs(prevBugs => prevBugs.map(prevBug => {
                      if (prevBug.id === bug.id) {
                        return { ...prevBug, linkCommit: newLink };
                      }
                      return prevBug;
                    }));
                  }}
                />
                <button onClick={() => resolveBug(bug.id, bug.linkCommit)}>Marchează ca rezolvat</button> */}

                <input
                  type="text"
                  placeholder="Link Commit"
                  value={commitLinkInput}
                  onChange={(e) => setCommitLinkInput(e.target.value)} 
                />

                <button onClick={() => {
                  resolveBug(bug.id, commitLinkInput); 
                  setBugs(prevBugs => prevBugs.map(prevBug => {
                    if (prevBug.id === bug.id) {
                      return { ...prevBug, linkCommit: commitLinkInput }; 
                    }
                    return prevBug;
                  }));
                }}>
                  Marchează ca rezolvat
                </button>
                
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBugs;
