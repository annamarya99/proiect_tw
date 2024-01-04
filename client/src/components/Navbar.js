import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  
function getUserPrivillege() {
  return window.sessionStorage.getItem("userPrivillege");
 }
  return (
    <nav className="navbar">
      <ul>
      <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/adaugaproiect">Adaugă Proiect</Link></li>
        <li><Link to="/adaugabug">Adaugă Bug</Link></li>
        <li><Link to="/viewbugs">Vezi Bug-uri</Link></li>
        {getUserPrivillege() === 'TST' ?
         <li> <Link to='/viewprojectsTST'><p>Vezi proiectele</p></Link></li> :
         <li><Link to='/viewprojectsMP'><p>Vezi proiectele</p></Link></li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
