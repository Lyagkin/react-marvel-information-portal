import { useEffect, useId, useState } from "react";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./comicsList.scss";

const ComicsList = ({ setComicId }) => {
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
      <li key={index} className="comics__item" onClick={() => setComicId(id)}>
        <a href="#!">
          <img src={thumbnail} alt={title} className="comics__item-img" />
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">{prices}</div>
        </a>
      </li>
    );
  });

  const spinner = loading && comicsList.length === 0 ? <Spinner /> : null;
  const errorPage = error ? <Page404 /> : null;
  const content = comicsList.length !== 0 ? renderedComicsList : null;

  const gridStyle = (loading || error) && !uploading ? "comics__grid center" : "comics__grid";

  const disabledButton = uploading || comicsListLimit ? true : false;

  const styleButton = disabledButton ? "button button__main button__long opacity" : "button button__main button__long";

  return (
    <div className="comics__list">
      <ul className={gridStyle}>
        {spinner} {errorPage}
        {content}
      </ul>
      <button disabled={disabledButton} className={styleButton} onClick={uploadComicsList}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
