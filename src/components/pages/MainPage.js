import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import Skeleton from "../skeleton/Skeleton";

import decoration from "../../resources/img/vision.png";
import SearchCharForm from "../searchCharForm/SearchCharForm";

import { useOutlet } from "react-router-dom";

import "./mainPage.scss";

function MainPage() {
  const [characterId, setCharacterId] = useState("");

  const outlet = useOutlet();

  return (
    <>
      {outlet ? (
        <>{outlet}</>
      ) : (
        <>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>

          <div className="char__content">
            <ErrorBoundary>
              <CharList setCharacterId={setCharacterId} />
            </ErrorBoundary>

            {characterId ? (
              <div className="char__plates">
                <ErrorBoundary>
                  <CharInfo characterId={characterId} />
                </ErrorBoundary>
                <ErrorBoundary>
                  <SearchCharForm />
                </ErrorBoundary>
              </div>
            ) : (
              <ErrorBoundary>
                <Skeleton />
              </ErrorBoundary>
            )}
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </>
      )}
    </>
  );
}

export default MainPage;
