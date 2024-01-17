import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const AdaugaProiect = () => {
  const [numeProiect, setNumeProiect] = useState('');
  const [repository, setRepository] = useState('');
  const [utilizatori, setUtilizatori] = useState([]);
  const [selectedTeamProiect, setSelectedTeamProiect] = useState([]);
  const [selectedTeamTestare, setSelectedTeamTestare] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/utilizatori')
      .then(response => response.json())
      .then(data => setUtilizatori(data))
      .catch(error => {
        console.error('Eroare la obținerea listei de utilizatori:', error);
      });
  }, []);

  const handleAdaugaProiect = async () => {
    try {
      const userId = window.sessionStorage.getItem("userId");
      const response = await fetch('http://localhost:5000/api/proiecte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numeProiect,
          repository,
          echipaProiectului: selectedTeamProiect,
          echipaTestare: selectedTeamTestare,
          userId
        }),
      });

      if (response.ok) {
        setSuccessMessage('Proiect adăugat cu succes!');
      } else {
        console.error('Eroare la adăugarea proiectului (1):', response.statusText);
      }
    } catch (error) {
      console.error('Eroare la adăugarea proiectului(2):', error);
    }
  };

  const handleUserSelection = (userId, teamType) => {
    if (teamType === 'echipaProiectului') {
      setSelectedTeamProiect(prevState => {
        if (prevState.includes(userId)) {
          return prevState.filter(id => id !== userId);
        } else {
          return [...prevState, userId];
        }
      });
    } else if (teamType === 'echipaTestare') {
      setSelectedTeamTestare(prevState => {
        if (prevState.includes(userId)) {
          return prevState.filter(id => id !== userId);
        } else {
          return [...prevState, userId];
        }
      });
    }
  };

  const isUserSelected = (userId, teamType) => {
    if (teamType === 'echipaProiectului') {
      return selectedTeamProiect.includes(userId);
    } else if (teamType === 'echipaTestare') {
      return selectedTeamTestare.includes(userId);
    }
    return false;
  };

  // useEffect(() => {
  //   if (successMessage) {
  //     window.location.href = '/dashboard';
  //   }
  // }, [successMessage]);

  return (
    <div className='container'>
      <h2>Adauga proiect</h2>

   
    <form>
      <label>
        Nume Proiect:
        <input type="text" value={numeProiect} onChange={(e) => setNumeProiect(e.target.value)} />
      </label>

      <label>
        Repository:
        <input type="text" value={repository} onChange={(e) => setRepository(e.target.value)} />
      </label>

      <div>
        <label>Echipa Proiectului:</label>
        <Select
          isMulti
          value={utilizatori
            .filter((user) => user.tipUtilizator === 'MP')
            .filter((user) => selectedTeamProiect.includes(user.id))
            .map((user) => ({ value: user.id, label: user.username }))}
          options={utilizatori
            .filter((user) => user.tipUtilizator === 'MP')
            .map((user) => ({ value: user.id, label: user.username }))}
          onChange={(selectedOptions) => setSelectedTeamProiect(selectedOptions.map(option => option.value))}
        />
      </div>

      <div>
        <label>Echipa Testare:</label>
        <Select
          isMulti
          value={utilizatori
            .filter((user) => user.tipUtilizator === 'TST')
            .filter((user) => selectedTeamTestare.includes(user.id))
            .map((user) => ({ value: user.id, label: user.username }))}
          options={utilizatori
            .filter((user) => user.tipUtilizator === 'TST')
            .map((user) => ({ value: user.id, label: user.username }))}
          onChange={(selectedOptions) => setSelectedTeamTestare(selectedOptions.map(option => option.value))}
        />
      </div>

      <button type="button" onClick={handleAdaugaProiect}>Adaugă Proiect</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
    </div>
  );
};

export default AdaugaProiect;
