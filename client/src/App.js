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

const App = () => {
  return (
    <div>
      <h1>Aplicație React</h1>
      {/* <SignUp /> 
      <LogIn /> */}
      {/* <AdaugaProiect /> */}
      {/* <ViewProjectsMP /> */}
      {/* < ViewProjectsTST /> */}
      <AddBug />
      {/* <ViewBugs /> */}
      {/* <Dashboard /> */}
    </div>
  

  );
};

export default App;
