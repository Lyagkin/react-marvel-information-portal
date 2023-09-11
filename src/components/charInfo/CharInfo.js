import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charInfo.scss";

function CharInfo({ characterId }) {
  const [character, setCharacter] = useState(null);

  const { getCharactersDataById, loading, error, clearError } = useMarvelService();

  const characterLoaded = (character) => {
    setCharacter(character);
  };

  const getCharacterData = () => {
    if (error) {
      clearError();
    }

    getCharactersDataById(characterId).then(characterLoaded);
  };

  useEffect(() => {
    getCharacterData();
  }, [characterId]);

  let spinner = loading ? <Spinner /> : null;
  let errorMessage = error ? <Page404 /> : null;
  let content = !loading && !error && character ? <Character character={character} /> : null;

  return (
    <>
      {errorMessage} {spinner}
      <div className="char__info">{content}</div>
    </>
  );
}

function Character({ character }) {
  const { thumbnail, name, description, homepage, wiki, comics } = character;

  // comics.map((comic) => {
  //   const regExp = /\d/g;
  //   console.log(comic.resourceURI.match(regExp).join(""));
  // });

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
