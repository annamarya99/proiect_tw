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
import ViewProjects from './components/ViewProjects';

const App = () => {
  return (
    <div>
      <h1>Aplicație React</h1>
      {/* <SignUp /> 
      <LogIn /> */}
      {/* <AdaugaProiect /> */}
      <ViewProjects />
    </div>
    // <>
    //         {/* This is the alias of BrowserRouter i.e. Router */}
    //         <Router>
    //             <Routes>
    //                 {/* This route is for home component 
    //       with exact path "/", in component props 
    //       we passes the imported component*/}
    //                 <Route
    //                     exact
    //                     path="/"
    //                     element={<LogIn />}
    //                 />
 
    //                 {/* This route is for about component 
    //       with exact path "/about", in component 
    //       props we passes the imported component*/}
    //                 <Route
    //                     path="/about"
    //                     element={<SignUp />}
    //                 />
 
                    
    //             </Routes>
    //         </Router>
    //     </>
    

  );
};

export default App;
