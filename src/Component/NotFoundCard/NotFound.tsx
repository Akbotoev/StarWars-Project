import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.scss'; 
import StarwarsCharacter from './../../assets/image/starwarsCharacter.png'
import NotFounder from './../../assets/image/NotFound.png'


const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleBackToHome = () =>{
    navigate('/')
  }
  return (
    <div className="notfound">
      <img  className="notfound__title" src={NotFounder}/>
        <img className="notfound__message" src={StarwarsCharacter}/>
      <Link to="/"className="notfound__link" onClick={handleBackToHome}>Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
