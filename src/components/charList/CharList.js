import React, { Component } from "react";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charList.scss";

class CharList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characterList: [],
      loading: true,
      error: false,
      offset: 210,
      upLoading: false,
      limit: false,
    };
  }

  marvelService = new MarvelService();

  charactersRefs = [];

  setMyCharacterRef = (element) => {
    // this.charactersRefs.push(element);

    this.charactersRefs = this.charactersRefs.concat(element);
  };

  setFocusRef = (index) => {
    this.charactersRefs.forEach((ref) => ref.classList.remove("char__item_selected"));
    this.charactersRefs[index].classList.add("char__item_selected");
    this.charactersRefs[index].focus();
  };

  setError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  characterListLoaded = (newCharacterList) =>
    this.setState(({ characterList }) => ({
      characterList: characterList.concat(newCharacterList),
      loading: false,
      upLoading: false,
    }));

  getCharacterList = (offset) => {
    this.marvelService.getAllCharactersData(offset).then(this.characterListLoaded).catch(this.setError);
  };

  componentDidMount() {
    this.getCharacterList();
  }

  updateCharacterList = () => {
    if (this.state.offset <= 1553) {
      this.setState(({ offset }) => ({
        offset: offset + 9,
        upLoading: true,
      }));
    } else {
      this.setState({
        limit: true,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.getCharacterList(this.state.offset);
    }

    console.log("update");
    console.log(this.charactersRefs);
  }

  render() {
    let { characterList, loading, error, upLoading, limit, offset } = this.state;

    const newCharacterList = characterList.map(({ thumbnail, name, id }, index) => {
      let itemStyleClass = "char__item";
      let imgStyleClass;

      if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
        imgStyleClass = `not_available`;
      }

      return (
        <li
          onClick={() => {
            this.props.setCharacterId(id);

            this.setFocusRef(index);
          }}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              this.props.setCharacterId(id);
              this.setFocusRef(index);
            }
          }}
          ref={this.setMyCharacterRef}
          style={{ cursor: "pointer" }}
          key={id}
          className={itemStyleClass}
          data-id={id}
          tabIndex={0}
        >
          <img className={imgStyleClass} src={thumbnail} alt={thumbnail} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    let spinner = loading ? <Spinner /> : null;
    let errorMessage = error ? <Page404 /> : null;
    let content = !loading && !error ? newCharacterList : null;
    let miniSpinner = upLoading ? <Spinner upLoading={upLoading} /> : null;

    let charListStyleClass = "char__list";
    let buttonStyle = null;
    let buttonShow;

    if (loading) {
      charListStyleClass += ` center`;
    }

    if (upLoading) {
      buttonStyle = true;
    }

    if (limit || offset === 1553) {
      buttonShow = { display: "none" };
    }

    let disabled = buttonStyle ? { opacity: 0.5 } : { opacity: 1 };

    return (
      <div className={charListStyleClass}>
        {spinner} {errorMessage}
        <ul className="char__grid">{content}</ul>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          {miniSpinner}
        </div>
        <div style={buttonShow}>
          <button
            style={disabled}
            disabled={buttonStyle}
            className="button button__main button__long"
            onClick={this.updateCharacterList}
          >
            <div className="inner">load more</div>
          </button>
        </div>
      </div>
    );
  }
}

export default CharList;
