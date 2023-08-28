import React, { useCallback, useEffect, useRef, useState } from "react";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charList.scss";

function CharList(props) {
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(210);
  const [upLoading, setUploading] = useState(false);
  const [limit, setLimit] = useState(false);

  const marvelService = MarvelService();

  const characterListLoaded = (newCharacterList) => {
    setCharacterList((characterList) => characterList.concat(newCharacterList));
    setLoading(false);
    setUploading(false);
  };

  const getCharacterList = (offset) => {
    marvelService
      .getAllCharactersData(offset)
      .then(characterListLoaded)
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const updateCharacterList = () => {
    if (offset <= 1553) {
      setOffset((offset) => offset + 9);
      setUploading(true);
    } else {
      setLimit(true);
    }
  };

  useEffect(() => {
    getCharacterList(offset);
  }, [offset]);

  const charactersRefs = useRef([]);

  const setCharacterRefs = useCallback((elem) => {
    charactersRefs.current.push(elem);
  }, []);

  const setFocusRef = (index) => {
    charactersRefs.current.forEach((ref) => ref.classList.remove("char__item_selected"));
    charactersRefs.current[index].classList.add("char__item_selected");
    charactersRefs.current[index].focus();
  };

  const newCharacterList = characterList.map(({ thumbnail, name, id }, index) => {
    let itemStyleClass = "char__item";
    let imgStyleClass;

    if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
      imgStyleClass = `not_available`;
    }

    return (
      <li
        onClick={() => {
          props.setCharacterId(id);

          setFocusRef(index);
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            props.setCharacterId(id);

            setFocusRef(index);
          }
        }}
        ref={setCharacterRefs}
        style={{ cursor: "pointer" }}
        key={id}
        className={itemStyleClass}
        data-id={id}
        tabIndex={0}
      >
        <img className={imgStyleClass} src={thumbnail} alt={thumbnail} />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  let spinner = loading ? <Spinner /> : null;
  let errorMessage = error ? <Page404 /> : null;
  let content = !loading && !error ? newCharacterList : null;
  let miniSpinner = upLoading ? <Spinner upLoading={upLoading} /> : null;

  let charListStyleClass = "char__list";
  let buttonStyle = null;
  let buttonShow;

  if (loading) {
    charListStyleClass += ` center`;
  }

  if (upLoading) {
    buttonStyle = true;
  }

  if (limit || offset === 1553) {
    buttonShow = { display: "none" };
  }

  let disabled = buttonStyle ? { opacity: 0.5 } : { opacity: 1 };

  return (
    <div className={charListStyleClass}>
      {spinner} {errorMessage}
      <ul className="char__grid">{content}</ul>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
        {miniSpinner}
      </div>
      <div style={buttonShow}>
        <button
          style={disabled}
          disabled={buttonStyle}
          className="button button__main button__long"
          onClick={updateCharacterList}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </div>
  );
}

export default CharList;
