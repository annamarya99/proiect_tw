// client/src/App.js
import React from 'react';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdaugaProiect from './components/AdaugaProiect';
import ViewProjectsMP from './components/ViewProjectsMP';
import AddBug from './components/AddBug';
import ViewBugs from './components/ViewBugs';
import Dashboard from './components/Dashboard';
import ViewProjectsTST from './components/ViewProjectsTST';
import Navbar from './components/Navbar';
//import './App.css';
import './components/style.css'
const App = () => {
  return (
    <div>
      <Router>  
      <Navbar />  
    
      <Routes>
        <Route index element={<LogIn/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/adaugaproiect' element={<AdaugaProiect/>}/>
        <Route path='/adaugabug' element={<AddBug/>}/>
        <Route path='/viewbugs' element={<ViewBugs/>}/>
        <Route path='/viewprojectsMP' element={<ViewProjectsMP/>}/>
        <Route path='/viewprojectsTST' element={<ViewProjectsTST/>}/>
      </Routes>

     </Router>
    </div>
  

  );
};

export default App;
