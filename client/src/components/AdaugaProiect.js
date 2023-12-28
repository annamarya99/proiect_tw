import React, { useState, useEffect } from 'react';

const AdaugaProiect = () => {
  const [numeProiect, setNumeProiect] = useState('');
  const [repository, setRepository] = useState('');
  const [echipaProiectului, setEchipaProiectului] = useState('');
  const [echipaTestare, setEchipaTestare] = useState('');
  const [utilizatori, setUtilizatori] = useState([]);

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
      <label>
        Echipa Proiectului:
        <select value={echipaProiectului} onChange={(e) => setEchipaProiectului(e.target.value)}>
          <option value="">Selectați echipa</option>
          {utilizatori.filter((user) => user.tipUtilizator === 'MP').map((utilizator) => (
            <option key={utilizator.id} value={utilizator.id}>
              {utilizator.username}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Echipa Testare:
        <select value={echipaTestare} onChange={(e) => setEchipaTestare(e.target.value)}>
          <option value="">Selectați echipa</option>
          {utilizatori.filter((user) => user.tipUtilizator === 'TST').map((utilizator) => (
            <option key={utilizator.id} value={utilizator.id}>
              {utilizator.username}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="button" onClick={handleAdaugaProiect}>Adaugă Proiect</button>
    </form>
  );
};

export default AdaugaProiect;
