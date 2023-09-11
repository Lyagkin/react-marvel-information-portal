import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SingleComic from "../singleComic/SingleComic";

function SingleComicPage() {
  return (
    <>
      <ErrorBoundary>
        <SingleComic />
      </ErrorBoundary>
    </>
  );
}

export default SingleComicPage;
