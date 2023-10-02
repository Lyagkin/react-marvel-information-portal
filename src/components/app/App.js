import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import Spinner from "../spinner/Spinner";

const PageNotFound = lazy(() => import("../pages/404/404"));
const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicPage/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage/SingleComicPage"));
const SingleCharacterData = lazy(() => import("../singleCharacter/SingleCharacter"));

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route path="characters/:charName" element={<SingleCharacterData />} />
              </Route>

              <Route path="comics" element={<ComicsPage />}>
                <Route path=":comicId" element={<SingleComicPage />} />
                <Route path="characters/:comicId" element={<SingleComicPage />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
