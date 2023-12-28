// LogIn.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogIn = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          // Poți face ceva după autentificare reușită, cum ar fi redirecționarea către o altă pagină
          window.sessionStorage.setItem("userPrivillege", data.tipUtilizator);
          window.sessionStorage.setItem("userId", data.id);
          console.log(data.id);
        } else {
          const errorMessage = await response.text();
          console.error(`Autentificare eșuată: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Eroare la autentificare:', error);
      }
  };

  

  return (
    <div>
      <h2>Log In</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <Link to="/dashboard"><button onClick={handleLogIn}>Log In</button></Link>
      <Link to="/SignUp">Creează cont</Link>
      <br />
      
      
    </div>
  );
};

export default LogIn;
