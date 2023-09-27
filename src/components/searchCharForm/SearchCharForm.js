import { useState } from "react";
import { Link } from "react-router-dom";
import Page404 from "../page404/Page404";
import useMarvelService from "../../services/MarvelService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./searchCharForm.scss";

const SearchCharForm = () => {
  const [charName, setCharName] = useState("");

  const { getCharacterDataByName, loading, error, clearError } = useMarvelService();

  const characterLoaded = (character) => {
    if (!character) {
      setCharName("not found!");
    } else {
      setCharName(character);
    }
  };

  const getCharacterData = (charName) => {
    if (error) {
      clearError();
    }

    getCharacterDataByName(charName).then(characterLoaded);
  };

  let charNameLink;

  const spinner = loading ? "Search..." : null;
  const errorPage = error ? <Page404 /> : null;

  const characterNotFound =
    charName === "not found!" && !loading && !errorPage ? (
      <span style={{ color: "#9F0013" }}>Character with this name do not exist! Be careful!</span>
    ) : null;

  const content =
    charName && !loading && !characterNotFound && !errorPage ? `There is! Visit ${charName.name} page?` : null;

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
              <p>
                {spinner} {characterNotFound} {content}
              </p>
              {characterNotFound ? null : (
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
