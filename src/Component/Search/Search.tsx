import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Search.scss';
import gif from '../../assets/image/gifStarwars.gif'

interface Character {
  name: string;
  id: number;
}

const Search: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showGif, setShowGif] = useState<boolean>(false); // Для управления видимостью gif
  const [currentPage, setCurrentPage] = useState<number>(1);
  const backgroundColor = localStorage.getItem('backgroundColor') || '';  
  const charactersPerPage = 9;

  const uniqueCharacters = new Set<string>();

  const fetchCharacters = async (url: string = 'https://swapi.dev/api/people/') => {
    try {
      const response = await axios.get(url);
      const data = response.data;

      const charactersOnPage: Character[] = data.results
        .filter((character: any) => !uniqueCharacters.has(character.name))
        .map((character: any) => {
          uniqueCharacters.add(character.name);
          return {
            name: character.name,
            id: parseInt(character.url.match(/\/(\d+)\/$/)[1], 10),
          };
        });

      setCharacters(prevCharacters => [...prevCharacters, ...charactersOnPage]);

      if (data.next) {
        fetchCharacters(data.next);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCharacters([]);
      setShowGif(false); // Скрыть gif, если введены только пробелы или поле пустое
      setCurrentPage(1);
      return;
    }

    setIsLoading(true);

    const uppercaseQuery = query.trim().toUpperCase();
    const filtered = characters.filter((character) =>
      character.name.toUpperCase().startsWith(uppercaseQuery)
    );
    
    setFilteredCharacters(filtered);
    setIsLoading(false);
    setCurrentPage(1);

    if (filtered.length === 0) {
      // Устанавливаем задержку в 0.4 секунды перед показом gif
      const timer = setTimeout(() => {
        setShowGif(true);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      setShowGif(false);
    }
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
        placeholder="Search character by first letter..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search__input"
      />

      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        query && (
          <div className="search__results">
            {currentCharacters.map((character) => (
              <Link
                key={character.id}
                to={`/CharacterInfo/InforCharacter/${character.id}`}
                className="search__item"
              >
                <img
                  className="search__img"
                  src={getCharacterImage(character.id)}
                  alt={character.name}
                />
                <span className="search__name">{character.name}</span> 
              </Link>
            ))}
          </div>
        )
      )}

      {!isLoading && query.trim() !== '' && filteredCharacters.length === 0 && showGif && (
        <div className="no-results">
          <img src={gif} alt="No character found" className="no-results__gif" />
          <p className="no-results__text">Такого персонажа нет</p>
        </div>
      )}
    </div>
  );
};

export default Search;


