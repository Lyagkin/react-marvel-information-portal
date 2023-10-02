import { NavLink } from "react-router-dom";

import "./404.scss";

const PageNotFound = () => {
  return (
    <div className="error__page">
      <div className="error__page-title">
        <h2 className="error__page-subtitle">Sorry! This page is not exist!</h2>
        <NavLink style={{ color: "#9F0013" }} to="/">
          Go back!
        </NavLink>
      </div>

      <div className="error__page-img"></div>
    </div>
  );
};

export default PageNotFound;
