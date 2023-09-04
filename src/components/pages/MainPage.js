import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Skeleton from "../skeleton/Skeleton";

import decoration from "../../resources/img/vision.png";

function MainPage() {
  const [characterId, setCharacterId] = useState("");

  return (
    <>
      <ErrorBoundary>
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
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
}

export default MainPage;
