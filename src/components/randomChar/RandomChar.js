import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  state = {
    character: {},
    loading: true,
    error: false,
  };

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

  clearError = () => {
    this.setState({
      error: true,
    });
  };

  marvelService = new MarvelService();

  characterLoaded = (character) => this.setState({ character, loading: false });

  randomId = (min, max) => {
    return min + Math.random() * (max - min);
  };

  getCharacterData = () => {
    const id = this.randomId(1011000, 1011400).toFixed();

    this.setLoading();

    this.marvelService.getCharactersDataById(id).then(this.characterLoaded).catch(this.setError);

    if (this.state.error === true) {
      this.setState(({ error }) => ({
        error: !error,
      }));
    }
  };

  componentDidMount() {
    this.getCharacterData();
  }

  render() {
    const { character, loading, error } = this.state;

    const spinner = loading ? <Spinner /> : null;

    const content = !loading && !error ? <CharacterDynamicComponent character={character} /> : null;

    const errorMessage = error ? <Page404 /> : null;

    return (
      <div className="randomchar">
        {content} {errorMessage} {spinner}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.getCharacterData}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

function CharacterDynamicComponent({ character }) {
  let { thumbnail, name, description, homepage, wiki } = character;

  let imgStyleClass = "randomchar__img";

  if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
    imgStyleClass += ` not_available`;
  }

  if (description === "") {
    description += "Sorry! Information about this character not yet been created. We are working on this!";
  } else if (description !== undefined) {
    description = `${description.slice(0, 150)}...`;
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt={name} className={imgStyleClass} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;
