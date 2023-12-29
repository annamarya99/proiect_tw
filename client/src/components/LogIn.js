// LogIn.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';



const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const navigate=useNavigate();
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
          
          console.log(data);
          window.sessionStorage.setItem("userPrivillege", data.userType);
          console.log(data);
          window.sessionStorage.setItem("userId", data.userId);
          if(data.userId){
            console.log(data.userId);
          }else{
            console.log('userid null');
          }
          console.log(data);

          navigate("/dashboard");
        } else {
          const errorMessage = await response.text();
          console.error(`Autentificare eșuată: ${errorMessage}`);
          setError('Nume de utilizator sau parolă incorectă');
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
      <button onClick={handleLogIn}>Log In</button>
      <Link to="/SignUp">Creează cont</Link>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
    </div>
  );
};

export default LogIn;
