import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

function RandomChar() {
  const [character, setCharacter] = useState(null);

  const { getCharactersDataById, loading, error, clearError } = useMarvelService();

  const characterLoaded = (character) => {
    setCharacter(character);
  };

  const randomId = (min, max) => {
    return min + Math.random() * (max - min);
  };

  const getCharacterData = () => {
    const id = randomId(1011000, 1011400).toFixed();

    if (error) {
      clearError();
    }

    getCharactersDataById(id).then(characterLoaded);
  };

  useEffect(() => {
    getCharacterData();
  }, []);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <Page404 /> : null;
  const content = !loading && !error ? <CharacterDynamicComponent character={character} /> : null;

  return (
    <div className="randomchar">
      {content} {errorMessage} {spinner}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={getCharacterData}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
}

function CharacterDynamicComponent({ character }) {
  let { thumbnail, name, description, homepage, wiki } = character;

  let imgStyleClass = "randomchar__img";

  if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
    imgStyleClass += ` not_available`;
  }

  if (description === "") {
    description += "Sorry! Information about this character not yet been created. We are working on this!";
  } else if (description !== undefined) {
    description = `${description.slice(0, 150)}...`;
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt={name} className={imgStyleClass} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;
