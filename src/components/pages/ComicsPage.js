import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

function ComicsPage({ setComicId }) {
  return (
    <>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList setComicId={setComicId} />
      </ErrorBoundary>
    </>
  );
}

export default ComicsPage;
