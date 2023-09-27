import React, { useCallback, useEffect, useRef, useState } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charList.scss";

function CharList(props) {
  const [characterList, setCharacterList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [upLoading, setUploading] = useState(false);
  const [limit, setLimit] = useState(false);

  const { getAllCharactersData, error, loading } = useMarvelService();

  const characterListLoaded = (newCharacterList) => {
    setCharacterList((characterList) => characterList.concat(newCharacterList));
    setUploading(false);
  };

  const getCharacterList = (offset) => {
    getAllCharactersData(offset).then(characterListLoaded);
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
      <CSSTransition key={id} timeout={500} classNames="char">
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
          className={itemStyleClass}
          data-id={id}
          tabIndex={0}
        >
          <img className={imgStyleClass} src={thumbnail} alt={thumbnail} />
          <div className="char__name">{name}</div>
        </li>
      </CSSTransition>
    );
  });

  let spinner = loading && !upLoading ? <Spinner /> : null;
  let errorMessage = error ? <Page404 /> : null;
  let content = characterList.length !== 0 ? newCharacterList : null;

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
      <TransitionGroup component="ul" className="char__grid">
        {content}
      </TransitionGroup>
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
