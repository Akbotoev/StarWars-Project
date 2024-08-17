import { useState, useEffect, FC } from 'react';
import './HomePages.scss';
import greenSword from '../../assets/image/greenSwords.png';
import redSword from './../../assets/image/RedSwords.jpg';
import blueSword from './../../assets/image/starSide.jpg';
import starsTheme from './../../assets/image/starstheme.jpg'

const HomePage: FC = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>(() => {
    return localStorage.getItem('backgroundColor') || '#ffffff';
  });
  const [textColor, setTextColor] = useState<string>(() => {
    return localStorage.getItem('textColor') || '#000000';
  });

  useEffect(() => {
    document.body.style.transition = 'background 0.5s ease-in-out, color 0.5s ease-in-out';
    document.body.style.color = textColor;
    document.body.style.background = backgroundColor;
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('textColor', textColor);
  }, [backgroundColor, textColor]);

  const handleButtonClick = (bgColor: string, txtColor: string) => {
    setBackgroundColor(bgColor);
    setTextColor(txtColor);
  };

  return (
    <div className="container" style={{ backgroundColor }}>
      <h2 className="container__title" style={{ color: textColor }}>
        CHOOSE YOUR SIDE
      </h2>
      <div className="container__cont">
        <div className="container__card">
          <div className="container__topic container__light">Light Side</div>
          <img
            src={greenSword}
            onClick={() => handleButtonClick('linear-gradient(90deg, #DC2424, #4A569D)', 'white')} 
            className="container__imgcard container__lightcard"
            alt="greensword"
          />
        </div>
        <div className="container__card">
          <div className="container__topic container__dark">Dark Side</div>
          <img
            src={redSword}
            onClick={() => handleButtonClick('linear-gradient(45deg,#800080 , #000000)', 'yellow')} 
            className="container__imgcard container__darkcard"
            alt="redsword"
          />
        </div>
        <div className="container__card">
          <div className="container__topic container__star">Stars Side</div>
          <img
            src={blueSword}
            onClick={() => handleButtonClick(`url(${starsTheme})`, 'blue')} 
            className="container__imgcard container__starcard"
            alt="bluesword"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;




