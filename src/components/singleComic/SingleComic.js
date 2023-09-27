import withSingleInfo from "../../hooks/withSingleInfo";

import "./singleComic.scss";

const SingleComic = ({ data, goBack }) => {
  const { thumbnail, title, description, pageCount, language, prices } = data;

  return (
    <div className="single-comic">
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
    </div>
  );
};

const SingleComicData = withSingleInfo(SingleComic);

export default SingleComicData;
