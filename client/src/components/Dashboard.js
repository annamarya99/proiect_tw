import React from 'react';
import { GoBug } from "react-icons/go";
import { VscDebugConsole } from "react-icons/vsc";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import { Link } from 'react-router-dom';

const Dashboard = () => {

function getUserPrivillege() {
 return window.sessionStorage.getItem("userPrivillege");
}

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Link to=""> */}
        {getUserPrivillege() == 'TST'? 

        <div style={iconContainerStyle}>
          <MdOutlinePlaylistAdd size={100} />
          <p style={titleStyle}>Adaugă Proiect</p>
        </div> : null }
        
        {/* </Link> */}
        <div style={iconContainerStyle}>
          <IoMdList size={100} />
          {/* DE FACUT LA RUTE : in functie de userPrivillege : MP/TST se deschide ViewProjectMP sau ViewProjectTST */}
          <p style={titleStyle}>Vezi proiectele</p>
        </div>
        <div style={iconContainerStyle}>
          <GoBug size={100} />
          <p style={titleStyle}>Raportează Bug</p>
        </div>
        <div style={iconContainerStyle}>
          <VscDebugConsole size={100} />
          <p style={titleStyle}>Vezi bug-uri</p>
        </div>
      </div>
    </div>
  );
};
const iconContainerStyle = {
    margin: '0 40px',
    textAlign: 'center',
    
  };
  
  const titleStyle = {
    marginTop: '10px',
    fontSize: '18px',
  };

export default Dashboard;
