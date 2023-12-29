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
    //const userId = 5; //!!HARDCODAT!!

    // const userId=window.sessionStorage.getItem("userId");
    // const apiUrl = `http://localhost:5000/api/bugs/${userId}`;

  //   const fetchBugs = async () => {
  //     try {
  //       const response = await fetch(apiUrl);
  //       const bugsData = await response.json();
  //       setBugs(bugsData);
  //     } catch (error) {
  //       console.error('Error loading bugs:', error);
  //     }
  //   };

  //   fetchBugs();
  // }, []);

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
      fetchBugs(); // Reîmprospătați lista de bug-uri după alocare
    } catch (error) {
      console.error('Error allocating bug:', error);
    }
  };

  // const resolveBug = async (bugId, linkCommit) => {
  //   try {
  //     await axios.put(`http://localhost:5000/bugs/${bugId}/resolve`, {
  //       linkCommit:linkCommit,
  //     });
  //     fetchBugs(); // Reîmprospătați lista de bug-uri după rezolvare
  //   } catch (error) {
  //     console.error('Error resolving bug:', error);
  //   }
  // };


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
      fetchBugs(); // Reîmprospătați lista de bug-uri după rezolvare
    } catch (error) {
      console.error('Error resolving bug:', error);
    }
  };



  function getUserPrivillege() {
    return window.sessionStorage.getItem("userPrivillege");
   }

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
            <p>Proiect asociat: {bug.ProjectId ? bug.numeProiect : 'N/A'}</p>
            <p>Status: {bug.status}</p>

            {bug.status === 'nerezolvat' && getUserPrivillege()=='MP' && !bug.alocatUserului && (
              <button onClick={() => allocateBug(bug.id)}>Alocă pentru rezolvare</button>
            )}
            {bug.status === 'alocat' && getUserPrivillege() === 'MP' && bug.alocatUserului === parseInt(window.sessionStorage.getItem("userId"),10) && (
              <>
                {/* <p>Link Commit: {bug.linkCommit || 'N/A'}</p> */}
                <p>Link commit rezolvare: </p>
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
                  value={commitLinkInput} // Schimbați aici pentru a folosi variabila locală
                  onChange={(e) => setCommitLinkInput(e.target.value)} // Actualizați variabila locală
                />

                <button onClick={() => {
                  resolveBug(bug.id, commitLinkInput); // Transmiteți commitLinkInput către funcția resolveBug
                  setBugs(prevBugs => prevBugs.map(prevBug => {
                    if (prevBug.id === bug.id) {
                      return { ...prevBug, linkCommit: commitLinkInput }; // Actualizați linkul commitului în memorie
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
