import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SingleComic from "../singleComic/SingleComic";

function SingleComicPage({ comicId }) {
  return (
    <>
      <ErrorBoundary>
        <SingleComic comicId={comicId} />
      </ErrorBoundary>
    </>
  );
}

export default SingleComicPage;
