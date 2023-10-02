import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import SingleComicData from "../../singleComic/SingleComic";

function SingleComicPage() {
  return (
    <>
      <ErrorBoundary>
        <SingleComicData />
      </ErrorBoundary>
    </>
  );
}

export default SingleComicPage;
