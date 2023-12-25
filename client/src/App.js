// client/src/App.js
import React from 'react';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


const App = () => {
  return (
    <div>
      <h1>Aplicație React</h1>
      <SignUp /> 
      <LogIn />
    </div>
    

  );
};

export default App;
