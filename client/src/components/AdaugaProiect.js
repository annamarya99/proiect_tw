import React, { useState, useEffect } from 'react';

const AdaugaProiect = () => {
  const [numeProiect, setNumeProiect] = useState('');
  const [repository, setRepository] = useState('');
  const [echipaProiectului, setEchipaProiectului] = useState('');
  const [echipaTestare, setEchipaTestare] = useState('');
  const [utilizatori, setUtilizatori] = useState([]);

  function getUserId() {
    return parseInt(window.sessionStorage.getItem("userId"),10);
   }

  useEffect(() => {
    // Încărcați lista de utilizatori din baza de date sau de la server
    // Puteți face o cerere GET pentru a obține lista de utilizatori
    fetch('http://localhost:5000/api/utilizatori')
      .then(response => response.json())
      .then(data => setUtilizatori(data))
      .catch(error => {
        console.error('Eroare la obținerea listei de utilizatori:', error);
      });
  }, []);

  const handleAdaugaProiect = async () => {
    try {
      const userId=window.sessionStorage.getItem("userId");
      // Trimiteți datele la server folosind metoda POST
      const response = await fetch('http://localhost:5000/api/proiecte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numeProiect,
          repository,
          echipaProiectului,
          echipaTestare,
          userId
        }),
      });

      if (response.ok) {
        // După trimiterea cu succes, puteți face orice acțiune adițională sau redirecționa către altă pagină
        console.log('Proiect adăugat cu succes!');
      } else {
        // Tratează cazul în care cererea nu este reușită
        console.error('Eroare la adăugarea proiectului (1):', response.statusText);
      }
    } catch (error) {
      console.error('Eroare la adăugarea proiectului(2):', error);
    }
  };

  const handleCheckboxChange = (userId, isChecked, teamType) => {
    if (isChecked) {
      if (teamType === 'echipaProiectului') {
        setEchipaProiectului(prevState => [...prevState, userId]);
      } else if (teamType === 'echipaTestare') {
        setEchipaTestare(prevState => [...prevState, userId]);
      }
    } else {
      if (teamType === 'echipaProiectului') {
        setEchipaProiectului(prevState => prevState.filter(id => id !== userId));
      } else if (teamType === 'echipaTestare') {
        setEchipaTestare(prevState => prevState.filter(id => id !== userId));
      }
    }
  };


  return (
    <form>
      <label>
        Nume Proiect:
        <input type="text" value={numeProiect} onChange={(e) => setNumeProiect(e.target.value)} />
      </label>
      <br />
      <label>
        Repository:
        <input type="text" value={repository} onChange={(e) => setRepository(e.target.value)} />
      </label>
      <br />
       <div>
        <label>Echipa Proiectului:</label>
        {utilizatori.filter((user) => user.tipUtilizator === 'MP').map((utilizator) => (
          <div key={utilizator.id}>
            <input
              type="checkbox"
              value={utilizator.id}
              checked={getUserId() === utilizator.id || echipaProiectului.includes(utilizator.id)}
              onChange={(e) => {
                if (getUserId() === utilizator.id) {
                  return; // Blochează capacitatea utilizatorului curent de a se modifica pe sine
                }
                handleCheckboxChange(utilizator.id, e.target.checked, 'echipaProiectului');
              }}
              disabled={getUserId() === utilizator.id}
            />
            <label>{utilizator.username}</label>
          </div>
        ))}
      </div>
      <br />
      <div>
        <label>Echipa Testare:</label>
        {utilizatori.filter((user) => user.tipUtilizator === 'TST').map((utilizator) => (
          <div key={utilizator.id}>
            <input
              type="checkbox"
              value={utilizator.id}
              checked={echipaTestare.includes(utilizator.id)}
              onChange={(e) => handleCheckboxChange(utilizator.id, e.target.checked, 'echipaTestare')}
            />
            <label>{utilizator.username}</label>
          </div>
        ))}
      </div>
      <br />
      <button type="button" onClick={handleAdaugaProiect}>Adaugă Proiect</button>
    </form>
  );
};

export default AdaugaProiect;
