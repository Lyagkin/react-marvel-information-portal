import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import useMarvelService from "../services/MarvelService";

import AppBanner from "../components/appBanner/AppBanner";
import Page404 from "../components/page404/Page404";
import Spinner from "../components/spinner/Spinner";

const withSingleInfo = (WrapperComponent) => {
  return (props) => {
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const id = useParams();

    const { loading, error, clearError, getSingleComicById, getCharacterDataByName } = useMarvelService();

    const getDataLoaded = (singleData) => {
      setData(singleData);
    };

    const getData = () => {
      for (let key in id) {
        if (key === "comicId") {
          getSingleComicById(id.comicId).then(getDataLoaded);
        } else if (key === "charName") {
          getCharacterDataByName(id.charName).then(getDataLoaded);
        }
      }
    };

    useEffect(() => {
      if (error) {
        clearError();
      }

      getData();
    }, [id]);

    const spinner = loading ? <Spinner /> : null;
    const errorPage = error ? <Page404 /> : null;
    const content = data && !spinner && !errorPage ? <WrapperComponent data={data} goBack={goBack} /> : null;

    return (
      <>
        <AppBanner />
        {spinner} {errorPage} {content}
      </>
    );
  };
};

export default withSingleInfo;
