import withSingleInfo from "../../hooks/withSingleInfo";

import "./singleCharacter.scss";

const SingleCharacter = ({ data, goBack }) => {
  const { thumbnail, name, description } = data;

  return (
    <>
      <div className="character__personal-data">
        <div className="character__personal-data-thumbnail">
          <img src={thumbnail} alt={name} />
        </div>
        <div className="character__personal-data-description">
          <div className="character__personal-data-description-name">{name}</div>
          <div className="character__personal-data-description-descr">{description}</div>
          <button className="button button__main" onClick={goBack}>
            <div className="inner">Go Back!</div>
          </button>
        </div>
      </div>
    </>
  );
};

const SingleCharacterData = withSingleInfo(SingleCharacter);

export default SingleCharacterData;
