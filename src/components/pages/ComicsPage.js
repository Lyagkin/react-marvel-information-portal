import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import { useOutlet } from "react-router-dom";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

function ComicsPage() {
  const outlet = useOutlet();

  console.log(outlet);
  return (
    <>
      {outlet ? (
        outlet
      ) : (
        <>
          <AppBanner />
          <ErrorBoundary>
            <ComicsList />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

export default ComicsPage;
