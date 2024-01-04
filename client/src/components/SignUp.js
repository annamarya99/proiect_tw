import {useState} from 'react'
import{Link,useNavigate} from 'react-router-dom'


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipUtilizator, setTipUtilizator] = useState('MP'); 

  const navigate=useNavigate();

  const handleSignUp = async () => {

    if (!username || !email || !password) {
      console.error('Toate câmpurile trebuie completate!');
      return; 
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, tipUtilizator }),
      });

      if (response.ok) {
        console.log('Utilizator înregistrat cu succes!');
        console.log(response);

        navigate('/login');
      } else {
        const errorMessage = await response.text();
        console.error(`Eroare la înregistrarea utilizatorului: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Eroare la înregistrarea utilizatorului:', error);
    }
  };

return (
  <div className="container">
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
    <label>Tip Utilizator:</label>
   
      <div>     <select value={tipUtilizator} onChange={(e) => setTipUtilizator(e.target.value)}>  <option value="MP">Membru de Proiect</option>
<option value="TST">Tester</option>
    </select></div>
      
    <br />
    <button onClick={handleSignUp}>Înregistrare</button>
     <div>    <Link to="/LogIn">Ai deja cont? Autentifică-te!</Link>
</div>
      <br />
  </div>
);

};
export default SignUp; 