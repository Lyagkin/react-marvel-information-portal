import { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import AppHeader from "../appHeader/AppHeader";

import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/SingleComicPage";

function App() {
  const [comicId, setComicId] = useState("");

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <ErrorBoundary>
                <MainPage />
              </ErrorBoundary>
            </Route>

            <Route exact path="/comics">
              <ErrorBoundary>
                <ComicsPage setComicId={setComicId} />
              </ErrorBoundary>
            </Route>

            <Route>
              <ErrorBoundary>
                <SingleComicPage comicId={comicId} />
              </ErrorBoundary>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
