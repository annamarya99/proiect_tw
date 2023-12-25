// client/src/components/SignUp.js
import React, { useState } from 'react';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });



      if (response.ok) {
        console.log('Utilizator înregistrat cu succes!');
      } else {
        const errorMessage = await response.text(); // Obține mesajul de eroare din corpul răspunsului
        console.error(`Eroare la înregistrarea utilizatorului(eroare mea): ${errorMessage}`);
      }
    } catch (error) {
      console.error('Eroare la înregistrarea utilizatorului:', error);
    }
  };

  return (
    <div>
      <h2>Înregistrare Utilizator</h2>
      <label>Username:</label>
      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Parolă:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleSignUp}>Înregistrare</button>
      
    </div>
  );
};

export default SignUp;