import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

function CharInfo({ characterId }) {
  const [character, setCharacter] = useState(null);

  const { getCharactersDataById, process, setProcess, clearError } = useMarvelService();

  const characterLoaded = (character) => {
    setCharacter(character);
  };

  const getCharacterData = () => {
    getCharactersDataById(characterId)
      .then(characterLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    clearError();
    getCharacterData();
  }, [characterId]);

  return (
    <>
      <div className="char__info">{setContent(process, Character, character)}</div>
    </>
  );
}

function Character({ data }) {
  const { thumbnail, name, description, homepage, wiki, comics } = data;

  let imgStyleClass;

  if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
    imgStyleClass = `not_available`;
  }

  return (
    <>
      <div className="char__basics">
        <img className={imgStyleClass} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description ? description : "Information about this character in progress! Sorry!"}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length !== 0
          ? comics.map((comic) => {
              const regExp = /\d/g;

              const id = comic.resourceURI.match(regExp).slice(1).join("");

              return (
                <li className="char__comics-item" key={comic.name}>
                  <Link to={`/comics/characters/${id}`}>{comic.name}</Link>
                </li>
              );
            })
          : "Comics about this character is not exist! Sorry!"}
      </ul>
    </>
  );
}

export default CharInfo;
