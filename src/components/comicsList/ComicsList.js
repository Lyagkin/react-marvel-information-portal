import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./comicsList.scss";

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

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setNewOffset] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [comicsListLimit, setComicsListLimit] = useState(false);

  const { getComicsData, process, setProcess } = useMarvelService();

  const comicsListLoaded = (newComicsList) => {
    setUploading(false);
    setComicsList((comicsList) => comicsList.concat(newComicsList));
  };

  const getComicsList = (offset) => {
    getComicsData(offset)
      .then(comicsListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const uploadComicsList = () => {
    if (offset <= 46162) {
      setUploading(true);
      setNewOffset((offset) => offset + 8);
    } else {
      setComicsListLimit(true);
    }
  };

  useEffect(() => {
    getComicsList(offset);
  }, [offset]);

  const renderedComicsList = comicsList.map(({ id, thumbnail, title, prices }, index) => {
    return (
      <CSSTransition key={index} timeout={500} classNames="comics">
        <li className="comics__item">
          <NavLink to={`/comics/${id}`}>
            <img src={thumbnail} alt={title} className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{prices}</div>
          </NavLink>
        </li>
      </CSSTransition>
    );
  });

  let content = (
    <TransitionGroup component="ul" className="comics__grid">
      {renderedComicsList}
    </TransitionGroup>
  );

  return (
    <div className="comics__list">
      {setContent(process, () => content, uploading)}
      <button
        style={{ display: comicsListLimit ? "none" : "block", opacity: uploading ? ".5" : "1" }}
        disabled={uploading}
        className="button button__main button__long"
        onClick={uploadComicsList}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
