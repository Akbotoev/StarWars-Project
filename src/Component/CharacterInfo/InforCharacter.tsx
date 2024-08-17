import { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from './../../FavoriteContecst';
import pl from '../../assets/image/bookmark.svg';
import './Info.scss';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  films: string[];
  id: string;
  imageUrl: string;
}

const InfoCharacter: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [randomMoviePoster, setRandomMoviePoster] = useState<string | null>(null);
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;
      
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        const characterData: Character = response.data;
        const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

        setCharacter({
          ...characterData,
          id,
          imageUrl,
        });
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleFavoriteClick = () => {
    if (character) {
      const charId = parseInt(character.id, 10);
      if (favorites.includes(charId)) {
        removeFavorite(charId);
      } else {
        addFavorite(charId);
      }
    }
  };

  const handleFilmClick = async (filmUrl: string) => {
    try {
      
      const movieId = filmUrl.split('/').slice(-2, -1)[0]; 
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=YOUR_TMDB_API_KEY`);
      const posters = response.data.posters;
      const randomPoster = posters[Math.floor(Math.random() * posters.length)];

      setRandomMoviePoster(`https://image.tmdb.org/t/p/w500${randomPoster.file_path}`);
    } catch (error) {
      console.error('Error fetching movie poster:', error);
    }
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  const isFavorite = favorites.includes(parseInt(character.id, 10));

  return (
    <div className="character">
      <Link to="/people" className="character__back-btn">Back to Characters</Link>
      <div className="character__content">
        <img className="character__image" src={character.imageUrl} alt={character.name} />
        <div className="character__details">
          <h2 className="character__title">
            {character.name}
            <img
              src={pl}
              alt="Bookmark"
              className={`character__bookmark ${isFavorite ? 'character__bookmark--active' : 'character__bookmark--inactive'}`}
              onClick={handleFavoriteClick}
            />
          </h2>
          <p className="character__attribute">Height: {character.height}</p>
          <p className="character__attribute">Mass: {character.mass}</p>
          <p className="character__attribute">Hair color: {character.hair_color}</p>
          <p className="character__attribute">Skin color: {character.skin_color}</p>
          <p className="character__attribute">Eye color: {character.eye_color}</p>
          <p className="character__attribute">Birth year: {character.birth_year}</p>
          <p className="character__attribute">MOVIE:</p>
          <ul className="character__films">
            {character.films.map((film, index) => (
              <li key={index} className="character__films__item">
                <a
                  href={film}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleFilmClick(film)}
                >
                  MOVIE {index + 1}
                </a>
              </li>
            ))}
          </ul>
          {randomMoviePoster && (
            <div className="character__poster">
              <img src={randomMoviePoster} alt="Random Movie Poster" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCharacter;







