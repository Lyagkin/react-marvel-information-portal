import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import useMarvelService from "../services/MarvelService";
import setContent from "../utils/setContent";

import AppBanner from "../components/appBanner/AppBanner";

const withSingleInfo = (WrapperComponent) => {
  return (props) => {
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const id = useParams();

    const { clearError, getSingleComicById, getCharacterDataByName, process, setProcess } = useMarvelService();

    const getDataLoaded = (singleData) => {
      setData(singleData);
    };

    const getData = () => {
      for (let key in id) {
        if (key === "comicId") {
          getSingleComicById(id.comicId)
            .then(getDataLoaded)
            .then(() => setProcess("confirmed"));
        } else if (key === "charName") {
          getCharacterDataByName(id.charName)
            .then(getDataLoaded)
            .then(() => setProcess("confirmed"));
        }
      }
    };

    useEffect(() => {
      clearError();

      getData();
    }, [id]);

    return (
      <>
        <AppBanner />
        {setContent(process, WrapperComponent, data, goBack)}
      </>
    );
  };
};

export default withSingleInfo;
