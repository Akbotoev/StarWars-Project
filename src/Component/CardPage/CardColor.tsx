import { FC } from "react";

 export interface CharacterProfileProps {
  name: string;
  image: string;
}

 export const CharacterProfile:FC<CharacterProfileProps> = ({ name, image }) => {
  return (
    <div className="card">
      <div className="card__characters">
        <img src={image} alt={name} />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default CharacterProfile;
