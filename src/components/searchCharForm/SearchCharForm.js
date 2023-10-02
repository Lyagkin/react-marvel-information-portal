import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Page404 from "../page404/Page404";

import useMarvelService from "../../services/MarvelService";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import "./searchCharForm.scss";

const setContent = (process, charName, characterNotFound) => {
  switch (process) {
    case "waiting":
      return null;
    case "loading":
      return "search...";
    case "error":
      return <Page404 />;
    case "confirmed":
      return charName === "not found!" ? characterNotFound.element : `There is! Visit ${charName.name} page?`;
    default:
      throw new Error("Unexpected process state");
  }
};

const SearchCharForm = () => {
  const [charName, setCharName] = useState("");

  useEffect(() => {
    setProcess("waiting");
  }, []);

  const { getCharacterDataByName, clearError, process, setProcess } = useMarvelService();

  const characterLoaded = (character) => {
    if (!character) {
      setCharName("not found!");
    } else {
      setCharName(character);
    }
  };

  const getCharacterData = (charName) => {
    clearError();

    getCharacterDataByName(charName)
      .then(characterLoaded)
      .then(() => setProcess("confirmed"));
  };

  let charNameLink;

  const characterNotFound = {
    title: "not found!",
    element: <span style={{ color: "#9F0013" }}>Character with this name do not exist! Be careful!</span>,
  };

  charName || characterNotFound ? (charNameLink = "search__form_link active") : (charNameLink = "search__form_link");

  return (
    <div className="search__form">
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={Yup.object({
          charName: Yup.string().min(3, "Add some letters!").required("This field is required!"),
        })}
        onSubmit={(values) => {
          getCharacterData(values.charName.toLowerCase());
        }}
      >
        <Form>
          <label htmlFor="charName">Or find a character by name:</label>
          <div className="search__form_wrapper">
            <Field
              id="charName"
              name="charName"
              type="text"
              className="search__form_wrapper-input"
              placeholder="Enter name"
            />
            <button type="submit" className="button button__main">
              <div className="inner">Find</div>
            </button>
            <ErrorMessage name="charName" component="span" className="search__form_wrapper-error" />
            <div className={charNameLink}>
              <p>{setContent(process, charName, characterNotFound)}</p>
              {charName === "not found!" || charName === "" ? null : (
                <Link to={`characters/${charName.name}`} className="button button__secondary">
                  <div className="inner">To page</div>
                </Link>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchCharForm;
