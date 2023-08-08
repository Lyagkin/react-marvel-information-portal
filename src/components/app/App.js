import { Component } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Skeleton from "../skeleton/Skeleton";

import decoration from "../../resources/img/vision.png";

class App extends Component {
  state = {
    characterId: "",
  };

  setCharacterId = (id) => {
    this.setState({
      characterId: id,
    });
  };

  render() {
    const { characterId } = this.state;

    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>

          <div className="char__content">
            <ErrorBoundary>
              <CharList setCharacterId={this.setCharacterId} />
            </ErrorBoundary>

            {characterId ? (
              <ErrorBoundary>
                <CharInfo characterId={characterId} />
              </ErrorBoundary>
            ) : (
              <ErrorBoundary>
                <Skeleton />
              </ErrorBoundary>
            )}
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
