import { useEffect, useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import Page404 from "../page404/Page404";
import Spinner from "../spinner/Spinner";

import "./singleComic.scss";

const SingleComic = () => {
  const [comic, setComic] = useState(null);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const { comicId } = useParams();

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
  const content = comic ? <Comic goBack={goBack} comic={comic} /> : null;

  return (
    <>
      {spinner} {errorPage}
      <div className="single-comic">{content}</div>
    </>
  );
};

const Comic = ({ comic, goBack }) => {
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
        <button className="single-comic__button" onClick={goBack}>
          Go back!
        </button>
      </div>

      {/* <Link style={{ color: "#9F0013" }} to="/comics" className="single-comic__back">
        Comics
      </Link> */}
    </>
  );
};

export default SingleComic;
