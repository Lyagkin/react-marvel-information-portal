import { useEffect, useRef, useState, useMemo } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charList.scss";

const setContent = (process, Component, uploading) => {
  switch (process) {
    case "loading":
      return uploading ? <Component /> : <Spinner />;
    case "error":
      return <Page404 />;
    case "confirmed":
      return <Component />;
    default:
      throw new Error("Unexpected process state");
  }
};

function CharList(props) {
  const [characterList, setCharacterList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [uploading, setUploading] = useState("");
  const [limit, setLimit] = useState(false);

  const { getAllCharactersData, process, setProcess } = useMarvelService();

  const characterListLoaded = (newCharacterList) => {
    setCharacterList((characterList) => characterList.concat(newCharacterList));
    setUploading("");
  };

  const getCharacterList = (offset) => {
    getAllCharactersData(offset)
      .then(characterListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const updateCharacterList = () => {
    if (offset <= 1553) {
      setOffset((offset) => offset + 9);
      setUploading("uploading");
    } else {
      setLimit(true);
    }
  };

  useEffect(() => {
    getCharacterList(offset);
  }, [offset]);

  const charactersRefs = useRef([]);

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
          ref={(elem) => {
            charactersRefs.current[index] = elem;
          }}
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

  let content = (
    <ul className="char__grid">
      <TransitionGroup component={null}>{newCharacterList}</TransitionGroup>
    </ul>
  );

  const charactersListItems = useMemo(() => {
    return setContent(process, () => content, uploading);
  }, [process]);

  return (
    <div className="char__list">
      {charactersListItems}
      <button
        style={{ display: limit ? "none" : "block", opacity: uploading ? "0.5" : "1" }}
        disabled={uploading}
        className="button button__main button__long"
        onClick={updateCharacterList}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

export default CharList;
