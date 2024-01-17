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
  <div className="container">
    <h2>Dashboard</h2>
    <div className="icon-container">
      {getUserPrivillege() === 'MP' ?
        <div>
          <MdOutlinePlaylistAdd size={100} />
          <Link to='/adaugaproiect' className="icon-link"><p>Adaugă Proiect</p></Link>
        </div> : null
      }
      <div>
        <IoMdList size={100} />
        {getUserPrivillege() === 'TST' ?
          <Link to='/viewprojectsTST' className="icon-link"><p>Vezi proiectele</p></Link> :
          <Link to='/viewprojectsMP' className="icon-link"><p>Vezi proiectele</p></Link>
        }
      </div>
      <div>
        <GoBug size={100} />
        <Link to='/adaugabug' className="icon-link"><p>Raportează Bug</p></Link>
      </div>
      <div>
        <VscDebugConsole size={100} />
        <Link to='/viewbugs' className="icon-link"><p>Vezi bug-uri</p></Link>
      </div>
    </div>
  </div>
);
};const iconContainerStyle = {
    margin: '0 40px',
    textAlign: 'center',
    
  };
  
  const titleStyle = {
    marginTop: '10px',
    fontSize: '18px',
  };

export default Dashboard;
