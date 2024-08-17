import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFavorites } from "../../FavoriteContecst"; 
import './Favorite.scss';
import pl from "./../../assets/image/bookmark.svg"
interface Character {
  name: string;
  id: number;
  imageUrl: string;
}

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteCharacters = await Promise.all(
          favorites.map(async (id: number) => {
            const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
            const characterData = response.data;
            return {
              name: characterData.name,
              id,
              imageUrl: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
            };
          })
        );
        setCharacters(favoriteCharacters);
      } catch (error) {
        console.error('Error fetching favorite characters:', error);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const handleRemoveFavorite = (id: number) => {
    removeFavorite(id);
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorite Characters</h2>
      {characters.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <ul className="favorites-list">
          {characters.map((character) => (
            <li key={character.id} className="favorite-item">
              <Link to={`/CharacterInfo/InforCharacter/${character.id}`}>
                <img src={character.imageUrl} alt={character.name} className="favorite-image" />
                <span className="character-name">{character.name}</span>
              </Link>
              <button
                onClick={() => handleRemoveFavorite(character.id)}
                className="remove-favorite-button"
                aria-label="Remove from Favorites"
              >
                <img src={pl} alt="Remove" className="remove-icon" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;





