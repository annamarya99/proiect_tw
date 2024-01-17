import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const[userPrivillege,setUserPrivillege]=useState(getUserPrivillege());
  useEffect(()=>{
    console.log("sesiune modificata")
    const updateUserPrivillege=()=>{
      setUserPrivillege(getUserPrivillege());
    };
    updateUserPrivillege();
    window.addEventListener('storage',updateUserPrivillege);
    return ()=>{
      window.removeEventListener('storage',updateUserPrivillege);
    };
    
  },[window.sessionStorage.getItem("userPrivillege")]);
  
function getUserPrivillege() {
  return window.sessionStorage.getItem("userPrivillege");
 }
  return (
    <nav className="navbar">
      <ul>
      <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {getUserPrivillege() === 'MP' ? 
        <li><Link to="/adaugaproiect">Adaugă Proiect</Link></li> : null
        }
        <li><Link to="/adaugabug">Adaugă Bug</Link></li>
        <li><Link to="/viewbugs">Vezi Bug-uri</Link></li>
        {getUserPrivillege() === 'TST' ?
         <li> <Link to='/viewprojectsTST'>Vezi proiectele</Link></li> :
         <li><Link to='/viewprojectsMP'>Vezi proiectele</Link></li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
