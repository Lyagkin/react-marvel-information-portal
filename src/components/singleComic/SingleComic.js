import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";

import Page404 from "../page404/Page404";
import Spinner from "../spinner/Spinner";

import "./singleComic.scss";

const SingleComic = ({ comicId }) => {
  const [comic, setComic] = useState(null);

  const { getSingleComicById, loading, error, clearError } = useMarvelService();

  const getComicLoaded = (singleComic) => {
    setComic(singleComic);
  };

  const getComicData = () => {
    getSingleComicById(comicId).then(getComicLoaded);
  };

  useEffect(() => {
    if (error) {
      clearError();
    }

    getComicData();
  }, [comicId]);

  const spinner = loading ? <Spinner /> : null;
  const errorPage = error ? <Page404 /> : null;
  const content = comic ? <Comic comic={comic} /> : null;

  return (
    <div className="single-comic">
      {spinner} {errorPage} {content}
    </div>
  );
};

const Comic = ({ comic }) => {
  const { thumbnail, title, description, pageCount, language, prices } = comic;

  return (
    <>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{prices}</div>
      </div>
      <a href="/comics" className="single-comic__back">
        Back to all
      </a>
    </>
  );
};

export default SingleComic;
