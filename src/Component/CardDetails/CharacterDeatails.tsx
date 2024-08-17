import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import './CharacterDetails.scss';
import { Link } from 'react-router-dom';

interface Character {
  name: string;
  id: number;
}

const CharacterFind: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [query, setQuery] = useState<string>('');   
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const charactersPerPage = 9;

  const backgroundColor = localStorage.getItem('backgroundColor') || '#ffffff';
  const textColor = localStorage.getItem('textColor') || '#000000';

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        const data: Character[] = response.data.results.map((character: any) => ({
          name: character.name,
          id: parseInt(character.url.match(/\/(\d+)\/$/)[1], 10),
        }));
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    document.body.style.background = backgroundColor;
    document.body.style.transition = 'background 0.5s ease-in-out, color 0.5s ease-in-out';
    document.body.style.color = textColor;
  }, [backgroundColor, textColor]);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [query, characters]);

  const getCharacterImage = (characterId: number) => {
    return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className="search" style={{ backgroundColor }}>
      <input
        type="text"
        placeholder="Search character..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search__input"
        style={{ color: textColor }}
      />
      <div className="search__results">
        {currentCharacters.map((character) => (
          <Link
            key={character.id}
            to={`/CharacterInfo/InforCharacter/${character.id}`}
            className="search__item"
            style={{ color: textColor }}
          >
            <img
              className="search__img"
              src={getCharacterImage(character.id)}
              alt={character.name}
            />
            <p>{character.name}</p>
          </Link>
        ))}
      </div>  
    </div>
  );
};

export default CharacterFind;










