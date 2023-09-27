import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setNewOffset] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [comicsListLimit, setComicsListLimit] = useState(false);

  const { getComicsData, loading, error } = useMarvelService();

  const comicsListLoaded = (newComicsList) => {
    setUploading(false);
    setComicsList((comicsList) => comicsList.concat(newComicsList));
  };

  const getComicsList = (offset) => {
    getComicsData(offset).then(comicsListLoaded);
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

  const spinner = loading && !comicsList.length ? <Spinner /> : null;
  const errorPage = error ? <Page404 /> : null;
  const content = comicsList.length ? renderedComicsList : null;

  const gridStyle = (loading || error) && !uploading ? "comics__grid center" : "comics__grid";

  const disabledButton = uploading || comicsListLimit ? true : false;

  const styleButton = disabledButton ? "button button__main button__long opacity" : "button button__main button__long";

  return (
    <div className="comics__list">
      {spinner} {errorPage}
      <TransitionGroup component="ul" className={gridStyle}>
        {content}
      </TransitionGroup>
      <button disabled={disabledButton} className={styleButton} onClick={uploadComicsList}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
