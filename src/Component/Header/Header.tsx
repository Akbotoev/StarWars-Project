import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import planet from '../../assets/image/space-station.png';
import pl from '../../assets/image/bookmark.svg';
import './Header.scss';
import { useFavorites } from '../../FavoriteContecst'; 
import { useAuth } from '../Authentical/AuthContecst';

const Header: FC = () => {
  const { favorites } = useFavorites(); 
  const { isAuthenticated } = useAuth()

  if(!isAuthenticated){
    return null;
  }
  return (
    <header className="header">
      <div className="container">
        <nav className='header__wrapper'>
          <div className='header__nav'>
            <NavLink to="/" className="header_logo-link">
              <img className="header__logo" src={planet} alt="Logo" />
            </NavLink>
            <NavLink to="/" className="header__link">
              Home
            </NavLink>
            <NavLink to="/people" className="header__link">
              People
            </NavLink>
            <NavLink to="/search" className="header__link">
              Search
            </NavLink>
          </div>
          <NavLink to="/favorites" className="header__link header__link__favorites">
            <img src={pl} alt="Favorites" />
            {favorites.length > 0 && (
              <span className="header__favorites-count">{favorites.length}</span>
            )}
          </NavLink>
    
        </nav>
      </div>
    </header>
  );
};

export default Header;



