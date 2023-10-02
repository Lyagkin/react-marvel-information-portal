import Spinner from "../components/spinner/Spinner";
import Page404 from "../components/page404/Page404";

const setContent = (process, Component, data, goBack) => {
  switch (process) {
    case "loading":
      return <Spinner />;
    case "error":
      return <Page404 />;
    case "confirmed":
      return <Component data={data} goBack={goBack} />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContent;
