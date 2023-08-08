import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    character: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  setLoading = () => {
    this.setState({
      loading: true,
    });
  };

  setError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  characterLoaded = (character) => this.setState({ character, loading: false });

  getCharacterData = () => {
    this.setLoading();

    this.marvelService.getCharactersDataById(this.props.characterId).then(this.characterLoaded).catch(this.setError);
  };

  componentDidMount() {
    this.getCharacterData();

    if (this.state.error === true) {
      this.setState({
        error: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.characterId !== this.props.characterId) {
      this.getCharacterData();
    }
  }

  render() {
    const { loading, error, character } = this.state;

    let spinner = loading ? <Spinner /> : null;
    let errorMessage = error ? <Page404 /> : null;
    let content = !loading && !error && character ? <Character character={character} /> : null;

    return (
      <>
        {errorMessage} {spinner}
        <div className="char__info">{content}</div>
      </>
    );
  }
}

function Character({ character }) {
  const { thumbnail, name, description, homepage, wiki, comics } = character;

  let imgStyleClass;

  if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
    imgStyleClass = `not_available`;
  }

  return (
    <>
      <div className="char__basics">
        <img className={imgStyleClass} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description ? description : "Information about this character in progress! Sorry!"}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length !== 0
          ? comics.map((comic) => (
              <li className="char__comics-item" key={comic.name}>
                <a href={comic.resourceURI}>{comic.name}</a>
              </li>
            ))
          : "Comics about this character is not exist! Sorry!"}
      </ul>
    </>
  );
}

export default CharInfo;
