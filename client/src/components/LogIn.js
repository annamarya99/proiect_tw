import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';


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
    <div className="container">
      <h2>Log In</h2>
      <div className='form-container'>
        <div className='flex-row'>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br /></div>
      <div className='flex-row'>
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /></div>
      <button onClick={handleLogIn}>Log In</button>
      <div>      <Link to="/SignUp">Creează cont</Link>
      <br />      {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default LogIn;