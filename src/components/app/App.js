import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Skeleton from "../skeleton/Skeleton";

import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

function App() {
  const [characterId, setCharacterId] = useState("");

  const [comicId, setComicId] = useState("");

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ComicsList setComicId={setComicId} />
        {comicId ? <SingleComic comicId={comicId} /> : null}

        {/* <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>

        <div className="char__content">
          <ErrorBoundary>
            <CharList setCharacterId={setCharacterId} />
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
        <img className="bg-decoration" src={decoration} alt="vision" /> */}
      </main>
    </div>
  );
}

export default App;
