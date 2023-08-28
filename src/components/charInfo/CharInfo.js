import { useEffect, useState } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charInfo.scss";

function CharInfo(props) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = MarvelService();

  const characterLoaded = (character) => {
    setCharacter(character);
    setLoading(false);
  };

  const getCharacterData = () => {
    setLoading(true);

    marvelService
      .getCharactersDataById(props.characterId)
      .then(characterLoaded)
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCharacterData();

    if (error === true) {
      setError((error) => !error);
    }
  }, []);

  useEffect(() => {
    getCharacterData();
  }, [props.characterId]);

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
          ? comics.map((comic) => (
              <li className="char__comics-item" key={comic.name}>
                <a href={comic.resourceURI}>{comic.name}</a>
              </li>
            ))
          : "Comics about this character is not exist! Sorry!"}
      </ul>
    </>
  );
}

export default CharInfo;
