import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CardRender.scss";

interface Character {
  name: string;
  id: number;
}

const CardRender: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const charactersPerPage = 12;

 
  const uniqueCharacters = new Set<string>();

  const fetchAllCharacters = async (url: string = 'https://swapi.dev/api/people/') => {
    try {
      const response = await axios.get(url);
      const data = response.data;

      const charactersOnPage: Character[] = data.results
        .filter((character: any) => !uniqueCharacters.has(character.name)) // Отфильтровываем дубликаты
        .map((character: any) => {
          uniqueCharacters.add(character.name);
          return {
            name: character.name,
            id: parseInt(character.url.match(/\/(\d+)\/$/)[1], 10),
          };
        });

      setCharacters(prevCharacters => [...prevCharacters, ...charactersOnPage]);

      if (data.next) {
        fetchAllCharacters(data.next);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  useEffect(() => {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
  }, []);

  const getCharacterImage = (characterId: number) => {
    return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage * charactersPerPage < characters.length;

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className="container" style={{ backgroundColor }}>
      <div className="starwars__btncont">
        <button className="starwars__btn" onClick={handlePrev} disabled={!hasPrev}>
          Previous
        </button>
        <button className="starwars__btn starwars__next" onClick={handleNext} disabled={!hasNext}>
          Next
        </button>
      </div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="starwars__grid">
          {currentCharacters.map((character) => (
            <Link
              key={character.id}
              to={`/CharacterInfo/InforCharacter/${character.id}`}
              className="starwars__item"
            >
              <img
                className="starwars__img"
                src={getCharacterImage(character.id)}
                alt={character.name}
              />
              <p className="starwars__name">{character.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardRender;







